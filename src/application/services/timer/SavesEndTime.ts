import type {
  Timer,
  TimerState,
  TimerStateBuilder,
} from '@/domain/models/Timer';
import type { TimerEndTimeRepository } from '@/application/ports/TimerEndTimeRepository';
import { UsedBeforeReadyError } from '@/application/services/timer/UsedBeforeReadyError';
import { checkDateStale } from '@/application/services/timer/checkDateStale';

class SavesEndTime implements Timer {
  private timer: Timer;

  private repo: TimerEndTimeRepository;

  private isReady = false;

  constructor(timer: Timer, repo: TimerEndTimeRepository) {
    this.timer = timer;
    this.repo = repo;
  }

  async init() {
    this.configureTimer();
    await this.timer.init();
    await this.loadSavedEndTimeIfExists();
    this.isReady = true;
  }

  private async loadSavedEndTimeIfExists() {
    const savedTimerEndsAt = await this.repo.getEndTime();
    if (savedTimerEndsAt === null) return;
    if (checkDateStale(savedTimerEndsAt)) {
      await this.repo.deleteEndTime();
      return;
    }
    await this.timer.start(savedTimerEndsAt);
  }

  private configureTimer() {
    this.timer.configure((b) => {
      b.configureIdleState((s) => {
        s.addOnStartListener((endsAt) => this.onStart(endsAt));
      });
      b.configureTickingState((s) => {
        s.addOnRestartListener((endsAt) => this.onStart(endsAt));
        s.addOnFinishListener(() => this.onFinish());
      });
    });
  }

  private onStart(endsAt: Date) {
    this.repo.setEndTime(endsAt);
  }

  private onFinish() {
    this.repo.deleteEndTime();
  }

  configure(cfg: (b: TimerStateBuilder, s: TimerState) => void): void {
    this.timer.configure(cfg);
  }

  async start(endsAt: Date): Promise<void> {
    if (!this.isReady) throw new UsedBeforeReadyError(this.constructor.name);
    await this.timer.start(endsAt);
  }
}

export { SavesEndTime };

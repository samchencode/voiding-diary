import type { Vibrator } from '@/application/ports/Vibrator';
import { UsedBeforeReadyError } from '@/application/services/timer/UsedBeforeReadyError';
import type {
  Timer,
  TimerState,
  TimerStateBuilder,
} from '@/domain/models/Timer';

class Vibrates implements Timer {
  timer: Timer;

  vibe: Vibrator;

  isReady = false;

  constructor(timer: Timer, vibe: Vibrator) {
    this.timer = timer;
    this.vibe = vibe;
  }

  private configureTimer() {
    this.timer.configure((b) => {
      b.configureTickingState((s) => {
        s.addOnFinishListener(() => this.onFinish());
      });
    });
  }

  private onFinish() {
    this.vibe.vibrate();
  }

  configure(cfg: (b: TimerStateBuilder, s: TimerState) => void): void {
    this.timer.configure(cfg);
  }

  async init(): Promise<void> {
    this.configureTimer();
    await this.timer.init();
    this.isReady = true;
  }

  async start(endsAt?: Date): Promise<void> {
    if (!this.isReady) throw new UsedBeforeReadyError(this.constructor.name);
    await this.timer.start(endsAt);
  }
}

export { Vibrates };

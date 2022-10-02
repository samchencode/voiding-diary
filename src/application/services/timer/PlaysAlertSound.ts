import type { AudioPlayer } from '@/application/ports/AudioPlayer';
import { UsedBeforeReadyError } from '@/application/services/timer/UsedBeforeReadyError';
import type {
  Timer,
  TimerState,
  TimerStateBuilder,
} from '@/domain/models/Timer';

class PlaysAlertSound implements Timer {
  private timer: Timer;

  private player: AudioPlayer;

  private isReady = false;

  constructor(timer: Timer, player: AudioPlayer) {
    this.timer = timer;
    this.player = player;
  }

  private configureTimer() {
    this.timer.configure((b) => {
      b.configureTickingState((s) => {
        s.addOnFinishListener(() => this.onFinish());
      });
    });
  }

  private onFinish() {
    this.player.playAlertSound();
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

export { PlaysAlertSound };

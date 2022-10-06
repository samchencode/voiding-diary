import type { Observer } from '@/domain/models/Timer/Observable';
import { Observable } from '@/domain/models/Timer/Observable';
import type { BaseTimer } from '@/domain/models/Timer/BaseTimer';
import type { TimerState } from '@/domain/models/Timer/TimerState';
import type { TimerStateBuilder } from '@/domain/models/Timer/TimerStateBuilder';
import { nowAddMs } from '@/domain/models/Timer/util';

class TickingState implements TimerState {
  static readonly type = 'TickingState';

  private context: BaseTimer;

  private builder: TimerStateBuilder;

  private defaultIntervalMs: number;

  private endsAt: Date;

  private stale = false;

  private onTickEvent = new Observable<number>();

  private onRestartEvent = new Observable<Date>();

  private onFinishEvent = new Observable<undefined>();

  constructor(
    context: BaseTimer,
    builder: TimerStateBuilder,
    endsAt: Date,
    defaultIntervalMs: number
  ) {
    this.context = context;
    this.builder = builder;
    this.endsAt = endsAt;
    this.defaultIntervalMs = defaultIntervalMs;
    this.tick();
  }

  start(endsAt: Date = nowAddMs(this.defaultIntervalMs)): void {
    this.onRestartEvent.notifyObservers(endsAt);
    const newTickingState = this.builder.buildTickingState(endsAt);
    this.context.setState(newTickingState);
    this.stale = true;
  }

  tick(): void {
    if (this.stale) return;
    const remainingMs = this.getRemainingTimeMs();

    if (remainingMs > 0) {
      this.onTickEvent.notifyObservers(remainingMs);
      requestAnimationFrame(() => this.tick());
    } else {
      this.finish();
    }
  }

  finish(): void {
    this.onFinishEvent.notifyObservers(undefined);
    const idleState = this.builder.buildIdleState();
    this.context.setState(idleState);
    this.stale = true;
  }

  addOnTickListener(o: Observer<number>) {
    this.onTickEvent.observe(o);
  }

  addOnRestartListener(o: Observer<Date>) {
    this.onRestartEvent.observe(o);
  }

  addOnFinishListener(o: Observer<undefined>) {
    this.onFinishEvent.observe(o);
  }

  setDefaultInterval(ms: number) {
    this.defaultIntervalMs = ms;
  }

  private getRemainingTimeMs() {
    const nowMs = Date.now();
    const endTimeMs = this.endsAt.getTime();
    return endTimeMs - nowMs;
  }
}

export { TickingState };

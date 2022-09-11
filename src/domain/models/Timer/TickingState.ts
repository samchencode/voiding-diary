import type { Observer } from '@/domain/models/Timer/Observable';
import { Observable } from '@/domain/models/Timer/Observable';
import type { Timer } from '@/domain/models/Timer/Timer';
import type { TimerState } from '@/domain/models/Timer/TimerState';
import type { TimerStateBuilder } from '@/domain/models/Timer/TimerStateBuilder';

class TickingState implements TimerState {
  context: Timer;

  builder: TimerStateBuilder;

  endsAt: Date;

  stale = false;

  onTickEvent = new Observable<number>();

  onRestartEvent = new Observable<Date>();

  onFinishEvent = new Observable<undefined>();

  constructor(context: Timer, builder: TimerStateBuilder, endsAt: Date) {
    this.context = context;
    this.builder = builder;
    this.endsAt = endsAt;
    this.tick();
  }

  start(endsAt: Date): void {
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

  private getRemainingTimeMs() {
    const nowMs = Date.now();
    const endTimeMs = this.endsAt.getTime();
    return endTimeMs - nowMs;
  }
}

export { TickingState };

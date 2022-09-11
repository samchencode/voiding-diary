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

  onTickEvent = new Observable();

  onRestartEvent = new Observable();

  onFinishEvent = new Observable();

  constructor(context: Timer, builder: TimerStateBuilder, endsAt: Date) {
    this.context = context;
    this.builder = builder;
    this.endsAt = endsAt;
    this.tick();
  }

  start(endsAt: Date): void {
    this.onRestartEvent.notifyObservers();
    const newTickingState = this.builder.buildTickingState(endsAt);
    this.context.setState(newTickingState);
    this.stale = true;
  }

  tick(): void {
    if (this.stale) return;
    this.onTickEvent.notifyObservers();

    if (this.checkShouldContinue()) {
      requestAnimationFrame(() => this.tick());
    } else {
      this.finish();
    }
  }

  finish(): void {
    this.onFinishEvent.notifyObservers();
    const idleState = this.builder.buildIdleState();
    this.context.setState(idleState);
    this.stale = true;
  }

  addOnTickListener(o: Observer) {
    this.onTickEvent.observe(o);
  }

  addOnRestartListener(o: Observer) {
    this.onRestartEvent.observe(o);
  }

  addOnFinishListener(o: Observer) {
    this.onFinishEvent.observe(o);
  }

  private checkShouldContinue() {
    const nowMs = Date.now();
    const endTimeMs = this.endsAt.getTime();
    return nowMs < endTimeMs;
  }
}

export { TickingState };

import type { Observer } from '@/domain/models/Timer/Observable';
import { Observable } from '@/domain/models/Timer/Observable';
import type { Timer } from '@/domain/models/Timer/Timer';
import type { TimerState } from '@/domain/models/Timer/TimerState';
import type { TimerStateBuilder } from '@/domain/models/Timer/TimerStateBuilder';

class IdleState implements TimerState {
  onStartEvent = new Observable();

  context: Timer;

  builder: TimerStateBuilder;

  constructor(context: Timer, builder: TimerStateBuilder) {
    this.context = context;
    this.builder = builder;
  }

  start(endsAt: Date): void {
    this.onStartEvent.notifyObservers();
    const tickingState = this.builder.buildTickingState(endsAt);
    this.context.setState(tickingState);
  }

  addOnStartListener(o: Observer) {
    this.onStartEvent.observe(o);
  }
}

export { IdleState };

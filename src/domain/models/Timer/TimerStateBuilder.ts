import { IdleState } from '@/domain/models/Timer/IdleState';
import { TickingState } from '@/domain/models/Timer/TickingState';
import type { Timer } from '@/domain/models/Timer/Timer';

type TickingStateModifer = (s: TickingState) => void;
type IdleStateModifer = (s: IdleState) => void;

class TimerStateBuilder {
  idleStateModifiers: IdleStateModifer[] = [];

  tickingStateModifiers: TickingStateModifer[] = [];

  context: Timer;

  constructor(context: Timer) {
    this.context = context;
  }

  configureIdleState(fn: IdleStateModifer) {
    this.idleStateModifiers.push(fn);
  }

  configureTickingState(fn: TickingStateModifer) {
    this.tickingStateModifiers.push(fn);
  }

  buildIdleState() {
    const state = new IdleState(this.context, this);
    this.idleStateModifiers.forEach((m) => m(state));
    return state;
  }

  buildTickingState(endsAt: Date) {
    const state = new TickingState(this.context, this, endsAt);
    this.tickingStateModifiers.forEach((m) => m(state));
    return state;
  }
}

export { TimerStateBuilder };

import { IdleState } from '@/domain/models/Timer/IdleState';
import { TickingState } from '@/domain/models/Timer/TickingState';
import type { BaseTimer } from '@/domain/models/Timer/BaseTimer';
import type { TimerState } from '@/domain/models/Timer/TimerState';

type TickingStateModifer = (s: TickingState) => void;
type IdleStateModifer = (s: IdleState) => void;
type InitialStateBuilder = (b: TimerStateBuilder) => TimerState;

class TimerStateBuilder {
  private idleStateModifiers: IdleStateModifer[] = [];

  private tickingStateModifiers: TickingStateModifer[] = [];

  private context: BaseTimer;

  private defaultIntervalMs = 1;

  // eslint-disable-next-line class-methods-use-this
  initialStateBuilder: InitialStateBuilder = (b) => b.buildIdleState();

  constructor(context: BaseTimer) {
    this.context = context;
  }

  configureIdleState(fn: IdleStateModifer) {
    this.idleStateModifiers.push(fn);
  }

  configureTickingState(fn: TickingStateModifer) {
    this.tickingStateModifiers.push(fn);
  }

  configureInitialStateBuilder(fn: InitialStateBuilder) {
    this.initialStateBuilder = fn;
  }

  setDefaultInterval(ms: number) {
    this.defaultIntervalMs = ms;
    this.context.getState().setDefaultInterval(ms);
  }

  buildInitialState() {
    return this.initialStateBuilder(this);
  }

  buildIdleState() {
    const state = new IdleState(this.context, this, this.defaultIntervalMs);
    this.idleStateModifiers.forEach((m) => m(state));
    return state;
  }

  buildTickingState(endsAt: Date) {
    const state = new TickingState(
      this.context,
      this,
      endsAt,
      this.defaultIntervalMs
    );
    this.tickingStateModifiers.forEach((m) => m(state));
    return state;
  }
}

export { TimerStateBuilder };

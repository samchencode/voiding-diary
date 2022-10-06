import type { BaseTimer } from '@/domain/models/Timer/BaseTimer';
import type { TimerState } from '@/domain/models/Timer/TimerState';
import type { TimerStateBuilder } from '@/domain/models/Timer/TimerStateBuilder';

class BeforeConfigureState implements TimerState {
  static readonly type = 'BeforeConfigureState';

  private context: BaseTimer;

  private builder: TimerStateBuilder;

  constructor(context: BaseTimer, builder: TimerStateBuilder) {
    this.context = context;
    this.builder = builder;
  }

  start(endsAt?: Date): void {
    const nextState = this.builder.buildInitialState();
    this.context.setState(nextState);
    this.context.start(endsAt);
  }

  // eslint-disable-next-line class-methods-use-this
  setDefaultInterval(): void {
    // no-op
  }
}

export { BeforeConfigureState };

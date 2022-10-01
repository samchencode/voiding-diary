import { BeforeConfigureState } from '@/domain/models/Timer/BeforeConfigureState';
import type { Timer } from '@/domain/models/Timer/Timer';
import type { TimerState } from '@/domain/models/Timer/TimerState';
import { TimerStateBuilder } from '@/domain/models/Timer/TimerStateBuilder';

class BaseTimer implements Timer {
  private stateBuilder: TimerStateBuilder;

  private state: TimerState;

  constructor() {
    this.stateBuilder = new TimerStateBuilder(this);
    this.state = new BeforeConfigureState(this, this.stateBuilder);
  }

  // eslint-disable-next-line class-methods-use-this
  async init() {
    // no-op
  }

  configure(cfg: (b: TimerStateBuilder, s: TimerState) => void) {
    cfg(this.stateBuilder, this.state);
  }

  async start(endsAt?: Date): Promise<void> {
    await this.state.start(endsAt);
  }

  setState(state: TimerState) {
    this.state = state;
  }

  getState() {
    return this.state;
  }
}

export { BaseTimer };

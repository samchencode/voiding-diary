import type { TimeInMins } from '@/domain/models/TimeInMins';
import type { TimerState } from '@/domain/models/Timer/TimerState';
import { TimerStateBuilder } from '@/domain/models/Timer/TimerStateBuilder';

class Timer {
  private state: TimerState;

  constructor(configure: (b: TimerStateBuilder) => void) {
    const builder = new TimerStateBuilder(this);
    configure(builder);
    this.state = builder.buildIdleState();
  }

  start(duration: TimeInMins) {
    const nowMs = Date.now();
    const durationMs = duration.getMinutesTotal() * 60 * 1000;
    const endsAt = new Date(nowMs + durationMs);
    this.state.start(endsAt);
  }

  setState(state: TimerState) {
    this.state = state;
  }
}

export { Timer };

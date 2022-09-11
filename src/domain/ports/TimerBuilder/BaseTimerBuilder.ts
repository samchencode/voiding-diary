import { Timer } from '@/domain/models/Timer';
import type { TimerStateBuilder } from '@/domain/models/Timer';
import type {
  ConfigureFunction,
  TimerBuilder,
} from '@/domain/ports/TimerBuilder/TimerBuilder';

class BaseTimerBuilder implements TimerBuilder {
  private fns: ConfigureFunction[] = [];

  configure(fn: ConfigureFunction): void {
    this.fns.push(fn);
  }

  build(): Timer {
    const cfg = (b: TimerStateBuilder) => this.fns.forEach((fn) => fn(b));
    return new Timer(cfg);
  }
}

export { BaseTimerBuilder };

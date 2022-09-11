import type { Timer } from '@/domain/models/Timer';
import type { TimerStateBuilder } from '@/domain/models/Timer/TimerStateBuilder';

type ConfigureFunction = (builder: TimerStateBuilder) => void;

interface TimerBuilder {
  configure(fn: ConfigureFunction): void;
  build(): Timer;
}

export type { TimerBuilder, ConfigureFunction };

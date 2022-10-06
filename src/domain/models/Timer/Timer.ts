import type { TimerState } from '@/domain/models/Timer/TimerState';
import type { TimerStateBuilder } from '@/domain/models/Timer/TimerStateBuilder';

interface Timer {
  configure(cfg: (b: TimerStateBuilder, s: TimerState) => void): void;
  init(): Promise<void>;
  start(endsAt?: Date): Promise<void>;
}

export type { Timer };

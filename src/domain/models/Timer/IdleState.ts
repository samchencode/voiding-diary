import type { Observer } from '@/domain/models/Timer/Observable';
import { Observable } from '@/domain/models/Timer/Observable';
import type { BaseTimer } from '@/domain/models/Timer/BaseTimer';
import type { TimerState } from '@/domain/models/Timer/TimerState';
import type { TimerStateBuilder } from '@/domain/models/Timer/TimerStateBuilder';
import { nowAddMs } from '@/domain/models/Timer/util';

class IdleState implements TimerState {
  static readonly type = 'IdleState';

  private onStartEvent = new Observable<Date>();

  private context: BaseTimer;

  private builder: TimerStateBuilder;

  private defaultIntervalMs: number;

  constructor(
    context: BaseTimer,
    builder: TimerStateBuilder,
    defaultIntervalMs: number
  ) {
    this.context = context;
    this.builder = builder;
    this.defaultIntervalMs = defaultIntervalMs;
  }

  start(endsAt: Date = nowAddMs(this.defaultIntervalMs)): void {
    this.onStartEvent.notifyObservers(endsAt);
    const tickingState = this.builder.buildTickingState(endsAt);
    this.context.setState(tickingState);
  }

  addOnStartListener(o: Observer<Date>) {
    this.onStartEvent.observe(o);
  }

  setDefaultInterval(ms: number): void {
    this.defaultIntervalMs = ms;
  }
}

export { IdleState };

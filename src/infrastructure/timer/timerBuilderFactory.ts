import type { TimerBuilder } from '@/domain/ports/TimerBuilder';
import { BaseTimerBuilder } from '@/domain/ports/TimerBuilder';
import { SavesEndTime } from '@/infrastructure/timer/SavesEndTime';
import { SendsNotifications } from '@/infrastructure/timer/SendsNotifications';

function timerBuilderFactory() {
  let b: TimerBuilder = new BaseTimerBuilder();
  b = new SavesEndTime(b);
  b = new SendsNotifications(b);
  return b;
}

export { timerBuilderFactory };

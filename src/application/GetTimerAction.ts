import type { NotificationRepository } from '@/application/ports/NotificationRepository';
import type { NotificationScheduler } from '@/application/ports/NotificationScheduler';
import type { TimerEndTimeRepository } from '@/application/ports/TimerEndTimeRepository';
import { SavesEndTime, SendsNotifications } from '@/application/services/timer';
import type { Timer } from '@/domain/models/Timer';
import { BaseTimer } from '@/domain/models/Timer';

class GetTimerAction {
  timer: Timer;

  constructor(
    timerEndTimeRepository: TimerEndTimeRepository,
    notificationRepository: NotificationRepository,
    notificationScheduler: NotificationScheduler
  ) {
    let timer: Timer = new BaseTimer();
    timer = new SavesEndTime(timer, timerEndTimeRepository);
    timer = new SendsNotifications(
      timer,
      notificationRepository,
      notificationScheduler
    );
    this.timer = timer;
  }

  async execute(): Promise<Timer> {
    await this.timer.init();
    return this.timer;
  }
}

export { GetTimerAction };

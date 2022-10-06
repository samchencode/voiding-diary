import type { AudioPlayer } from '@/application/ports/AudioPlayer';
import type { NotificationRepository } from '@/application/ports/NotificationRepository';
import type { NotificationScheduler } from '@/application/ports/NotificationScheduler';
import type { TimerEndTimeRepository } from '@/application/ports/TimerEndTimeRepository';
import type { Vibrator } from '@/application/ports/Vibrator';
import { SavesEndTime, SendsNotifications } from '@/application/services/timer';
import { PlaysAlertSound } from '@/application/services/timer/PlaysAlertSound';
import { Vibrates } from '@/application/services/timer/Vibrates';
import type { Timer } from '@/domain/models/Timer';
import { BaseTimer } from '@/domain/models/Timer';

class GetTimerAction {
  timer: Timer;

  constructor(
    timerEndTimeRepository: TimerEndTimeRepository,
    notificationRepository: NotificationRepository,
    notificationScheduler: NotificationScheduler,
    audioPlayer: AudioPlayer,
    vibrator: Vibrator
  ) {
    let timer: Timer = new BaseTimer();
    timer = new SavesEndTime(timer, timerEndTimeRepository);
    timer = new SendsNotifications(
      timer,
      notificationRepository,
      notificationScheduler
    );
    timer = new PlaysAlertSound(timer, audioPlayer);
    timer = new Vibrates(timer, vibrator);

    this.timer = timer;
  }

  async execute(): Promise<Timer> {
    await this.timer.init();
    return this.timer;
  }
}

export { GetTimerAction };

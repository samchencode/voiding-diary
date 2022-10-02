import type { AudioPlayer } from '@/application/ports/AudioPlayer';
import type { Vibrator } from '@/application/ports/Vibrator';
import { SavesEndTime, SendsNotifications } from '@/application/services/timer';
import { PlaysAlertSound } from '@/application/services/timer/PlaysAlertSound';
import { Vibrates } from '@/application/services/timer/Vibrates';
import type { Timer } from '@/domain/models/Timer';
import { BaseTimer } from '@/domain/models/Timer';
import { SpyAudioPlayer } from '@/infrastructure/audio/spy/SpyAudioPlayer';
import { SpyNotifcationScheduler } from '@/infrastructure/notification/spy/SpyNotificationScheduler';
import { FakeNotificationRepository } from '@/infrastructure/persistence/fake/FakeNotificationRepository';
import { FakeTimerEndTimeRepository } from '@/infrastructure/persistence/fake/FakeTimerEndTimeRepository';
import { SpyVibrator } from '@/infrastructure/vibration/spy/SpyVibrator';

describe('Timer decorators', () => {
  beforeAll(() =>
    jest.useFakeTimers({ advanceTimers: true, now: new Date(0) })
  );

  afterAll(() => jest.useRealTimers());

  afterEach(() => jest.clearAllTimers());

  describe('SavesEndTime', () => {
    describe('Instantiation', () => {
      it('should create a new timer given timer and repo', () => {
        const timer = new BaseTimer();
        const repo = new FakeTimerEndTimeRepository();
        const create = () => new SavesEndTime(timer, repo);
        expect(create).not.toThrowError();
      });
    });

    describe('Behavior', () => {
      let repo: FakeTimerEndTimeRepository;
      let base: BaseTimer;

      beforeEach(() => {
        repo = new FakeTimerEndTimeRepository();
        base = new BaseTimer();
      });

      it('should save start time', async () => {
        const timer = new SavesEndTime(base, repo);
        await timer.init();
        await timer.start(new Date(Date.now() + 30000));
        const v = await repo.getEndTime();
        expect(v).not.toBeNull();
      });

      it('should load saved time and resume automatically', async () => {
        const tickCb = jest.fn();
        const finishCb = jest.fn();

        await repo.setEndTime(new Date(Date.now() + 10000)); // 10 secs later
        const timer = new SavesEndTime(base, repo);
        timer.configure((b) => {
          b.configureTickingState((s) => {
            s.addOnTickListener(tickCb);
            s.addOnFinishListener(finishCb);
          });
        });
        await timer.init();

        jest.advanceTimersByTime(1);
        expect(tickCb).toBeCalled();
        jest.advanceTimersByTime(10000);
        expect(finishCb).toBeCalledTimes(1);
      });

      it('should remove saved time if save is stale', async () => {
        await repo.setEndTime(new Date(Date.now() - 10000)); // 10 secs ago
        const timer = new SavesEndTime(base, repo);
        await timer.init();

        expect(await repo.getEndTime()).toBeNull();
      });

      it('should not start timer if saved time is stale', async () => {
        const tickCb = jest.fn();

        await repo.setEndTime(new Date(Date.now() - 10000)); // 10 secs ago
        const timer = new SavesEndTime(base, repo);
        timer.configure((b) =>
          b.configureTickingState((s) => s.addOnTickListener(tickCb))
        );
        await timer.init();
        jest.advanceTimersByTime(1000);
        expect(tickCb).not.toBeCalled();
      });

      it('should remove saved time when timer finishes', async () => {
        const finishCb = jest.fn();

        await repo.setEndTime(new Date(Date.now() + 10000)); // 10 secs later
        const timer = new SavesEndTime(base, repo);
        timer.configure((b) => {
          b.configureTickingState((s) => {
            s.addOnFinishListener(finishCb);
          });
        });
        await timer.init();

        jest.advanceTimersByTime(10000);
        expect(await repo.getEndTime()).toBeNull();
      });

      it('should save new start time on restart', async () => {
        try {
          await repo.setEndTime(new Date(Date.now() + 10000)); // 10 secs later
          const timer = new SavesEndTime(base, repo);
          await timer.init();

          jest.advanceTimersByTime(5000); // adv 5 secs
          const newTime = new Date(Date.now() + 10000); // 10 secs later
          await timer.start(newTime);

          const endTime = await repo.getEndTime();
          if (!endTime) throw Error();
          expect(endTime.getTime()).toBe(Date.now() + 10000);
        } finally {
          jest.clearAllTimers();
        }
      });

      it('should throw an error if start before initializing', async () => {
        let err = false;
        try {
          const timer = new SavesEndTime(base, repo);
          await timer.start(new Date(10000));
        } catch {
          err = true;
        } finally {
          expect(err).toBe(true);
          jest.clearAllTimers();
        }
      });
    });
  });

  describe('SendsNotifications', () => {
    describe('Instantiation', () => {
      it('should create a new timer given a timer', () => {
        const timer = new BaseTimer();
        const repo = new FakeNotificationRepository();
        const scheduler = new SpyNotifcationScheduler({
          schedule: jest.fn(),
          cancel: jest.fn(),
          dismiss: jest.fn(),
        });
        const create = () => new SendsNotifications(timer, repo, scheduler);
        expect(create).not.toThrowError();
      });
    });

    describe('Behavior', () => {
      let schedule: jest.Mock;
      let cancel: jest.Mock;
      let dismiss: jest.Mock;
      let repo: FakeNotificationRepository;
      let scheduler: SpyNotifcationScheduler;
      let base: BaseTimer;
      const MOCK_SCHEDULE_ID = 'MOCK_ID';

      beforeEach(() => {
        schedule = jest.fn().mockReturnValue(MOCK_SCHEDULE_ID);
        cancel = jest.fn();
        dismiss = jest.fn();
        repo = new FakeNotificationRepository();
        scheduler = new SpyNotifcationScheduler({
          schedule,
          cancel,
          dismiss,
        });
        base = new BaseTimer();
      });

      afterEach(() => {
        jest.clearAllMocks();
      });

      it('should schedule notification onStart', async () => {
        const endsAt = new Date(0);
        const timer = new SendsNotifications(base, repo, scheduler);
        await timer.init();
        await timer.start(endsAt);
        expect(schedule).toBeCalledTimes(1);
        expect(schedule).toBeCalledWith(endsAt);
      });

      it('should save notification onStart', async () => {
        const endsAt = new Date(0);
        const timer = new SendsNotifications(base, repo, scheduler);
        await timer.init();
        await timer.start(endsAt);

        const saved = await repo.getNotificationOrNull();
        if (!saved) throw new Error();
        const id = saved.getId();
        const notifyAt = saved.getNotifyAt();
        expect(id).toBe(MOCK_SCHEDULE_ID);
        expect(notifyAt).toBe(endsAt);
      });

      it('should cancel schduled notification on a restart', async () => {
        const endsAt = new Date(0);
        const timer = new SendsNotifications(base, repo, scheduler);
        await timer.init();
        await timer.start(endsAt);
        // restart
        await timer.start(endsAt);

        expect(cancel).toBeCalledTimes(1);
      });

      it('should remove saved notification on a restart', async () => {
        const endsAt = new Date(0);
        const timer = new SendsNotifications(base, repo, scheduler);
        await timer.init();
        await timer.start(endsAt);
        // restart
        await timer.start(endsAt);

        expect(await repo.getNotificationOrNull()).toBe(null);
      });

      it('should remove, dismiss, & cancel notification on finish', async () => {
        const endsAt = new Date(1);
        const timer = new SendsNotifications(base, repo, scheduler);
        await timer.init();
        await timer.start(endsAt);

        jest.advanceTimersByTime(1);

        expect(await repo.getNotificationOrNull()).toBe(null);
        expect(dismiss).toBeCalledTimes(1);
        expect(cancel).toBeCalledTimes(1);
      });

      it('should restart timer on interaction before timer finish', async () => {
        const endsAt = new Date(0);
        const timer = new SendsNotifications(base, repo, scheduler);
        await timer.init();
        await timer.start(endsAt);
        expect(schedule).toBeCalledTimes(1);

        scheduler.simulateInteraction();

        jest.runAllTimers();

        expect(dismiss).toBeCalledTimes(1);
        expect(schedule).toBeCalledTimes(2);
      });

      it('should restart timer on interaction after timer finish', async () => {
        const endsAt = new Date(0);
        const timer = new SendsNotifications(base, repo, scheduler);
        await timer.init();
        await timer.start(endsAt);

        jest.runAllTimers();

        scheduler.simulateInteraction();

        jest.runAllTimers();

        expect(dismiss).toBeCalledTimes(1);
        expect(schedule).toBeCalledTimes(2);
      });

      it('should throw an error if start before initializing', async () => {
        let err = false;
        try {
          const timer = new SendsNotifications(base, repo, scheduler);
          await timer.start(new Date(10000));
        } catch {
          err = true;
        } finally {
          expect(err).toBe(true);
          jest.clearAllTimers();
        }
      });
    });
  });

  describe('PlaysAlertSound', () => {
    describe('Instantiation', () => {
      it('should create timer given AudioPlayer', () => {
        const player = new SpyAudioPlayer({});
        const base = new BaseTimer();
        const create = () => new PlaysAlertSound(base, player);
        expect(create).not.toThrowError();
      });
    });

    describe('Behavior', () => {
      let playAlertSound: jest.Mock;
      let player: AudioPlayer;
      let base: Timer;

      beforeEach(() => {
        playAlertSound = jest.fn();
        player = new SpyAudioPlayer({ playAlertSound });
        base = new BaseTimer();
      });

      it('should play sound when timer finishes', async () => {
        const timer = new PlaysAlertSound(base, player);
        await timer.init();
        await timer.start();
        jest.runAllTimers();
        expect(playAlertSound).toBeCalledTimes(1);
      });
    });
  });

  describe('Vibrates', () => {
    describe('Instantiation', () => {
      it('should create timer given Vibrator', () => {
        const vibe = new SpyVibrator({});
        const base = new BaseTimer();
        const create = () => new Vibrates(base, vibe);
        expect(create).not.toThrowError();
      });
    });

    describe('Behavior', () => {
      let vibrate: jest.Mock;
      let vibe: Vibrator;
      let base: Timer;

      beforeEach(() => {
        vibrate = jest.fn();
        vibe = new SpyVibrator({ vibrate });
        base = new BaseTimer();
      });

      it('should vibrate when timer finishes', async () => {
        const timer = new Vibrates(base, vibe);
        await timer.init();
        await timer.start();
        jest.runAllTimers();
        expect(vibrate).toBeCalledTimes(1);
      });
    });
  });
});

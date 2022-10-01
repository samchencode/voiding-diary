import { BaseTimer } from '@/domain/models/Timer';
import { TickingState } from '@/domain/models/Timer/TickingState';

describe('Timer', () => {
  describe('Instantiation', () => {
    it('should be created without configuration function', () => {
      const create = () => new BaseTimer();
      expect(create).not.toThrowError();
    });
  });

  describe('Behavior', () => {
    beforeAll(() => {
      jest.useFakeTimers({ advanceTimers: true, now: new Date(0) });
    });

    beforeEach(() => {
      jest.clearAllTimers();
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should start timer without any config', () => {
      const timer = new BaseTimer();
      const endsAt = new Date(Date.now() + 60000); // 1 minute
      const start = () => timer.start(endsAt);
      expect(start).not.toThrowError();
    });

    it('should start timer with empty config', () => {
      const timer = new BaseTimer();
      timer.configure(() => {});
      const endsAt = new Date(Date.now() + 60000); // 1 minute
      const start = () => timer.start(endsAt);
      expect(start).not.toThrowError();
    });

    it('should start timer with default timer duration', () => {
      const cb = jest.fn();
      const timer = new BaseTimer();
      timer.configure((b) => {
        b.configureTickingState((s) => {
          s.addOnFinishListener(cb);
        });
      });
      timer.start();

      jest.advanceTimersByTime(1); // 1 ms duration by default
      expect(cb).toBeCalledTimes(1);
      cb.mockReset();

      timer.configure((b) => b.setDefaultInterval(1000));
      timer.start();
      jest.advanceTimersByTime(10);
      expect(cb).not.toBeCalled();
      jest.advanceTimersByTime(1000);
      expect(cb).toBeCalledTimes(1);
    });

    it('should allow subscribing with onStart callback', () => {
      const cb = jest.fn();

      const endsAt = new Date(Date.now() + 60000); // 1 minute
      const timer = new BaseTimer();
      timer.configure((b) => {
        b.configureIdleState((s) => {
          s.addOnStartListener(cb);
        });
      });
      timer.start(endsAt);
      expect(cb).toBeCalledTimes(1);

      const endTime = new Date(Date.now() + 60000); // 1 minute later

      expect(cb).toBeCalledWith(endTime);
    });

    it('should allow subscribing to every tick of timer', () => {
      const cb = jest.fn();
      const endsAt = new Date(Date.now() + 60000); // 1 minute
      const timer = new BaseTimer();
      timer.configure((b) => {
        b.configureTickingState((s) => {
          s.addOnTickListener(cb);
        });
      });
      timer.start(endsAt);

      jest.advanceTimersToNextTimer();
      expect(cb).toBeCalledTimes(1);
      jest.advanceTimersToNextTimer();
      expect(cb).toBeCalledTimes(2);
      jest.advanceTimersToNextTimer();
      expect(cb).toBeCalledTimes(3);
    });

    it('should allow subscribing to onTick of a timer that has already started', () => {
      const cb = jest.fn();
      const endsAt = new Date(Date.now() + 60000); // 1 minute
      const timer = new BaseTimer();
      timer.start(endsAt);
      timer.configure((_, s) => {
        if (s instanceof TickingState) s.addOnTickListener(cb);
      });

      jest.advanceTimersToNextTimer();
      expect(cb).toBeCalledTimes(1);
      jest.advanceTimersToNextTimer();
      expect(cb).toBeCalledTimes(2);
      jest.advanceTimersToNextTimer();
      expect(cb).toBeCalledTimes(3);
    });

    it('should provide ms remaining to onTick cb', () => {
      const cb = jest.fn();
      const endsAt = new Date(Date.now() + 60000); // 1 minute
      const timer = new BaseTimer();
      timer.configure((b) => {
        b.configureTickingState((s) => {
          s.addOnTickListener(cb);
        });
      });
      timer.start(endsAt);

      jest.advanceTimersToNextTimer();
      expect(cb).toBeCalledTimes(1);
      expect(cb).toBeCalledWith(60000);
    });

    it('should allow subscribing to onFinish of timer', () => {
      const cb = jest.fn();
      const endsAt = new Date(Date.now() + 60000); // 1 minute
      const timer = new BaseTimer();
      timer.configure((b) => {
        b.configureTickingState((s) => {
          s.addOnFinishListener(cb);
        });
      });
      timer.start(endsAt);

      jest.advanceTimersByTime(60000); // 1 minute
      expect(cb).toBeCalledTimes(1);
    });

    it('should not tick after timer finishes', () => {
      const cb = jest.fn();
      const endsAt = new Date(Date.now() + 60000); // 1 minute
      const timer = new BaseTimer();
      timer.configure((b) => {
        b.configureTickingState((s) => {
          s.addOnTickListener(cb);
        });
      });
      timer.start(endsAt);

      jest.advanceTimersByTime(60000); // 1 minute
      cb.mockReset();
      jest.advanceTimersToNextTimer();
      expect(cb).not.toBeCalled();
    });

    it('should call onStart if start is called after finish', () => {
      const cb = jest.fn();

      const endsAt = new Date(Date.now() + 60000); // 1 minute
      const timer = new BaseTimer();
      timer.configure((b) => {
        b.configureIdleState((s) => {
          s.addOnStartListener(cb);
        });
      });
      timer.start(endsAt);
      jest.advanceTimersByTime(60000); // 1 minute
      timer.start(endsAt);
      jest.advanceTimersByTime(60000); // 1 minute

      expect(cb).toBeCalledTimes(2);
    });

    it('should set timer to new time if start is called before finish', () => {
      const cb = jest.fn();

      const endsAt1 = new Date(Date.now() + 60000); // 1 minute later
      const endsAt2 = new Date(Date.now() + 90000); // 1.5 minutes later
      const timer = new BaseTimer();
      timer.configure((b) => {
        b.configureTickingState((s) => {
          s.addOnFinishListener(cb);
        });
      });
      timer.start(endsAt1);
      jest.advanceTimersByTime(30000); // 30 seconds
      timer.start(endsAt2);
      jest.advanceTimersByTime(30000); // 30 seconds
      expect(cb).toBeCalledTimes(0);
      jest.advanceTimersByTime(30000);
      expect(cb).toBeCalledTimes(1);
      jest.runAllTimers();
      expect(cb).toBeCalledTimes(1);
    });

    it('should allow subscribing to onRestart event', () => {
      const cb = jest.fn();

      const endsAt1 = new Date(Date.now() + 60000); // 1 minute
      const endsAt2 = new Date(Date.now() + 120000); // 2 minutes
      const timer = new BaseTimer();
      timer.configure((b) => {
        b.configureTickingState((s) => {
          s.addOnRestartListener(cb);
        });
      });

      timer.start(endsAt1);
      timer.start(endsAt2);
      expect(cb).toBeCalledTimes(1);

      const endTime = new Date(Date.now() + 120000); // 2 minutes later

      expect(cb).toBeCalledWith(endTime);
    });
  });
});

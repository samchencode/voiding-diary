import { TimeInMins } from '@/domain/models/TimeInMins';
import { Timer } from '@/domain/models/Timer';

describe('Timer', () => {
  describe('Instantiation', () => {
    it('should be created given configuration function', () => {
      const create = () => new Timer(() => {});
      expect(create).not.toThrowError();
    });
  });

  describe('Behavior', () => {
    beforeAll(() => {
      jest.useFakeTimers();
    });

    beforeEach(() => {
      jest.clearAllTimers();
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should start timer', () => {
      const timer = new Timer(() => {});
      const duration = new TimeInMins(1); // 1 minute
      const start = () => timer.start(duration);
      expect(start).not.toThrowError();
    });

    it('should allow subscribing with onStart callback', () => {
      const cb = jest.fn();

      const duration = new TimeInMins(1); // 1 minute
      const timer = new Timer((b) => {
        b.configureIdleState((s) => {
          s.addOnStartListener(cb);
        });
      });
      timer.start(duration);
      expect(cb).toBeCalledTimes(1);

      const endTime = new Date(Date.now() + 60000); // 1 minute later

      expect(cb).toBeCalledWith(endTime);
    });

    it('should allow subscribing to every tick of timer', () => {
      const cb = jest.fn();
      const duration = new TimeInMins(1); // 1 minute
      const timer = new Timer((b) => {
        b.configureTickingState((s) => {
          s.addOnTickListener(cb);
        });
      });
      timer.start(duration);

      jest.advanceTimersToNextTimer();
      expect(cb).toBeCalledTimes(1);
      jest.advanceTimersToNextTimer();
      expect(cb).toBeCalledTimes(2);
      jest.advanceTimersToNextTimer();
      expect(cb).toBeCalledTimes(3);
    });

    it('should allow subscribing to onFinish of timer', () => {
      const cb = jest.fn();
      const duration = new TimeInMins(1); // 1 minute
      const timer = new Timer((b) => {
        b.configureTickingState((s) => {
          s.addOnFinishListener(cb);
        });
      });
      timer.start(duration);

      jest.advanceTimersByTime(60000); // 1 minute
      expect(cb).toBeCalledTimes(1);
    });

    it('should not tick after timer finishes', () => {
      const cb = jest.fn();
      const duration = new TimeInMins(1); // 1 minute
      const timer = new Timer((b) => {
        b.configureTickingState((s) => {
          s.addOnTickListener(cb);
        });
      });
      timer.start(duration);

      jest.advanceTimersByTime(60000); // 1 minute
      cb.mockReset();
      jest.advanceTimersToNextTimer();
      expect(cb).not.toBeCalled();
    });

    it('should call onStart if start is called after finish', () => {
      const cb = jest.fn();

      const duration = new TimeInMins(1); // 1 minute
      const timer = new Timer((b) => {
        b.configureIdleState((s) => {
          s.addOnStartListener(cb);
        });
      });
      timer.start(duration);
      jest.advanceTimersByTime(60000); // 1 minute
      timer.start(duration);
      jest.advanceTimersByTime(60000); // 1 minute

      expect(cb).toBeCalledTimes(2);
    });

    it('should set timer to new time if start is called before finish', () => {
      const cb = jest.fn();

      const duration = new TimeInMins(1); // 1 minute
      const timer = new Timer((b) => {
        b.configureTickingState((s) => {
          s.addOnFinishListener(cb);
        });
      });
      timer.start(duration);
      jest.advanceTimersByTime(30000); // 30 seconds
      timer.start(duration);
      jest.advanceTimersByTime(30000); // 30 seconds
      expect(cb).toBeCalledTimes(0);
      jest.advanceTimersByTime(30000);
      expect(cb).toBeCalledTimes(1);
      jest.runAllTimers();
      expect(cb).toBeCalledTimes(1);
    });

    it('should allow subscribing to onRestart event', () => {
      const cb = jest.fn();

      const duration1 = new TimeInMins(1); // 1 minute
      const duration2 = new TimeInMins(2); // 1 minute
      const timer = new Timer((b) => {
        b.configureTickingState((s) => {
          s.addOnRestartListener(cb);
        });
      });

      timer.start(duration1);
      timer.start(duration2);
      expect(cb).toBeCalledTimes(1);

      const endTime = new Date(Date.now() + 120000); // 2 minutes later

      expect(cb).toBeCalledWith(endTime);
    });
  });
});

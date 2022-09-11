import { TimeInMins } from '@/domain/models/TimeInMins';
import { Timer } from '@/domain/models/Timer';
import { BaseTimerBuilder } from '@/domain/ports/TimerBuilder';

describe('TimerBuilder', () => {
  describe('Instantiation', () => {
    it('should be created', () => {
      const create = () => new BaseTimerBuilder();
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

    it('should create a timer', () => {
      const builder = new BaseTimerBuilder();
      const timer = builder.build();
      expect(timer).toBeInstanceOf(Timer);
    });

    it('should configure timer', () => {
      const cb = jest.fn();
      const duration = new TimeInMins(1); // 1 minute

      const builder = new BaseTimerBuilder();
      builder.configure((b) => {
        b.configureIdleState((s) => {
          s.addOnStartListener(cb);
        });
      });

      const timer = builder.build();
      timer.start(duration);
      expect(cb).toBeCalledTimes(1);
    });
  });
});

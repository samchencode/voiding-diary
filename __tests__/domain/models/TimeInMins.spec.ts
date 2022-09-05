import { TimeInMins } from '@/domain/models/TimeInMins';

describe('TimeInMins', () => {
  describe('Instantiation', () => {
    it('should create new TimeInMins from integer', () => {
      const create = () => new TimeInMins(30);
      expect(create).not.toThrowError();
    });

    it('should create new time using hours', () => {
      const time = TimeInMins.fromHoursAndMinutes(5, 2);
      expect(time).toBeInstanceOf(TimeInMins);
    });
  });

  describe('Behavior', () => {
    it('should provide correct number of hours and minutes', () => {
      const time1 = new TimeInMins(182);
      expect(time1.getMinutesTotal()).toBe(182);
      expect(time1.getHours()).toBe(3);
      expect(time1.getMinutesWithinHour()).toBe(2);

      const time2 = new TimeInMins(1);
      expect(time2.getHours()).toBe(0);
      expect(time2.getMinutesWithinHour()).toBe(1);

      const time3 = TimeInMins.fromHoursAndMinutes(3, 2);
      expect(time3.getMinutesTotal()).toBe(182);
      expect(time3.getHours()).toBe(3);
      expect(time3.getMinutesWithinHour()).toBe(2);
    });

    it('should toString to <total hours>:<two-digit seconds>', () => {
      const time1 = new TimeInMins(182);
      expect(time1.toString()).toBe('3:02');

      const time2 = new TimeInMins(6002);
      expect(time2.toString()).toBe('100:02');

      const time3 = TimeInMins.fromHoursAndMinutes(3, 2);
      expect(time3.toString()).toBe('3:02');
    });

    it('should be equal with same number of minutes', () => {
      const time1 = new TimeInMins(1);
      const time2 = new TimeInMins(1);
      expect(time1.is(time2)).toBe(true);

      const time3 = new TimeInMins(2);
      expect(time1.is(time3)).toBe(false);
    });

    it('should throw error if minutes < 1', () => {
      const boom = () => new TimeInMins(0);
      expect(boom).toThrowError('0');
    });

    it('should throw error if given negative hours or minutes', () => {
      const boom1 = () => TimeInMins.fromHoursAndMinutes(-1, 0);
      expect(boom1).toThrowError('hours');

      const boom2 = () => TimeInMins.fromHoursAndMinutes(0, -1);
      expect(boom2).toThrowError('minutes');

      const noBoom = () => TimeInMins.fromHoursAndMinutes(0, 1);
      expect(noBoom).not.toThrowError();
    });
  });
});

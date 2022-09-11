import { Goal } from '@/domain/models/Goal';
import { TimeInMins } from '@/domain/models/TimeInMins';
import { VolumeInOz } from '@/domain/models/Volume';
import {
  checkSubmittable,
  checkUndefAndMakeGoal,
} from '@/view/goal-screen/util';

describe('@/view/goal-screen/util', () => {
  const targetIntakeVolume = new VolumeInOz(200);
  const targetVoidInterval = {
    am: new TimeInMins(60),
    pm: new TimeInMins(180),
  };

  let goal: Goal;

  beforeEach(() => {
    goal = new Goal(targetIntakeVolume, targetVoidInterval);
  });

  describe('checkSubmittable', () => {
    it('should not be submittable is any value is undefined', () => {
      expect(checkSubmittable(undefined, [1, 1], [2, 1], goal)).toBe(false);
      expect(checkSubmittable(0, [1, 1], [2, 1], goal)).toBe(true);
      expect(checkSubmittable(2, [undefined, 1], [2, 1], goal)).toBe(false);
      expect(checkSubmittable(2, [0, 1], [2, 1], goal)).toBe(true);
      expect(checkSubmittable(2, [1, undefined], [2, 1], goal)).toBe(false);
      expect(checkSubmittable(2, [1, 0], [2, 1], goal)).toBe(true);
      expect(checkSubmittable(2, [1, 4], [undefined, 1], goal)).toBe(false);
      expect(checkSubmittable(2, [1, 4], [0, 1], goal)).toBe(true);
      expect(checkSubmittable(2, [1, 4], [1, undefined], goal)).toBe(false);
      expect(checkSubmittable(2, [1, 4], [1, 0], goal)).toBe(true);
      expect(checkSubmittable(2, [1, 4], [1, 6], goal)).toBe(true);
    });

    it('should not be submittable if goal is equal to inputs', () => {
      expect(checkSubmittable(2, [1, 4], [1, 4], null)).toBe(true);
      expect(checkSubmittable(2, [1, 4], [1, 4], goal)).toBe(true);
      expect(checkSubmittable(200, [1, 0], [3, 0], goal)).toBe(false);
    });
  });

  describe('checkUndefAndMakeGoal', () => {
    it('should throw error if an undefined value is used', () => {
      const boom1 = () => checkUndefAndMakeGoal(undefined, [1, 1], [2, 1]);
      expect(boom1).toThrowError('must have a value');
      const boom2 = () => checkUndefAndMakeGoal(0, [1, 1], [2, 1]);
      expect(boom2).not.toThrowError();
      const boom3 = () => checkUndefAndMakeGoal(2, [undefined, 1], [2, 1]);
      expect(boom3).toThrowError('must have a value');
      const boom4 = () => checkUndefAndMakeGoal(2, [0, 1], [2, 1]);
      expect(boom4).not.toThrowError();
      const boom5 = () => checkUndefAndMakeGoal(2, [1, undefined], [2, 1]);
      expect(boom5).toThrowError('must have a value');
      const boom6 = () => checkUndefAndMakeGoal(2, [1, 0], [2, 1]);
      expect(boom6).not.toThrowError();
      const boom7 = () => checkUndefAndMakeGoal(2, [1, 4], [undefined, 1]);
      expect(boom7).toThrowError('must have a value');
      const boom8 = () => checkUndefAndMakeGoal(2, [1, 4], [0, 1]);
      expect(boom8).not.toThrowError();
      const boom9 = () => checkUndefAndMakeGoal(2, [1, 4], [1, undefined]);
      expect(boom9).toThrowError('must have a value');
      const boom10 = () => checkUndefAndMakeGoal(2, [1, 4], [1, 0]);
      expect(boom10).not.toThrowError();
      const boom11 = () => checkUndefAndMakeGoal(2, [1, 4], [1, 6]);
      expect(boom11).not.toThrowError();
    });

    it('should create a goal', () => {
      const newGoal = checkUndefAndMakeGoal(200, [1, 0], [3, 0]);
      expect(newGoal.is(goal)).toBe(true);
    });
  });
});

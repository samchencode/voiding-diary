import { Goal } from '@/domain/models/Goal';
import { TimeInMins } from '@/domain/models/TimeInMins';
import { VolumeInOz } from '@/domain/models/Volume';

describe('Goal', () => {
  describe('Instantiation', () => {
    it('should create a goal', () => {
      const targetIntakeVolume = new VolumeInOz(200);
      const targetVoidInterval = {
        am: new TimeInMins(60),
        pm: new TimeInMins(180),
      };
      const create = () => new Goal(targetIntakeVolume, targetVoidInterval);
      expect(create).not.toThrowError();
    });
  });

  describe('Behavior', () => {
    it('should be identical with same intake and intervals', () => {
      const targetIntakeVolume1 = new VolumeInOz(200);
      const targetVoidInterval1 = {
        am: new TimeInMins(60),
        pm: new TimeInMins(180),
      };
      const targetIntakeVolume2 = new VolumeInOz(200);
      const targetVoidInterval2 = {
        am: new TimeInMins(60),
        pm: new TimeInMins(180),
      };

      const goal1 = new Goal(targetIntakeVolume1, targetVoidInterval1);
      const goal2 = new Goal(targetIntakeVolume2, targetVoidInterval2);

      expect(goal1.is(goal2)).toBe(true);
    });

    it('should retrieve intake and intervals', () => {
      const targetIntakeVolume = new VolumeInOz(200);
      const targetVoidInterval = {
        am: new TimeInMins(60),
        pm: new TimeInMins(180),
      };
      const goal = new Goal(targetIntakeVolume, targetVoidInterval);

      expect(goal.getTargetIntake().is(targetIntakeVolume)).toBe(true);
      expect(goal.getAmTargetVoidInterval().is(targetVoidInterval.am)).toBe(
        true
      );
      expect(goal.getPmTargetVoidInterval().is(targetVoidInterval.pm)).toBe(
        true
      );
    });

    it('should serialize to object of primitives', () => {
      const targetIntakeVolume = new VolumeInOz(200);
      const targetVoidInterval = {
        am: new TimeInMins(60),
        pm: new TimeInMins(180),
      };
      const goal = new Goal(targetIntakeVolume, targetVoidInterval);
      expect(goal.serialize()).toEqual({
        amTargetVoidIntervalInMins: 60,
        pmTargetVoidIntervalInMins: 180,
        targetIntakeInOz: 200,
      });
    });
  });
});

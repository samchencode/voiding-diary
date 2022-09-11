import { Goal } from '@/domain/models/Goal';
import { TimeInMins } from '@/domain/models/TimeInMins';
import { VolumeInOz } from '@/domain/models/Volume';
import { hydrateGoal } from '@/domain/services/hydrateGoal';

describe('hydrateGoal', () => {
  it('should convert serialized goal to Goal', () => {
    const serialized = {
      amTargetVoidIntervalInMins: 60,
      pmTargetVoidIntervalInMins: 180,
      targetIntakeInOz: 200,
    };

    const targetIntakeVolume = new VolumeInOz(200);
    const targetVoidInterval = {
      am: new TimeInMins(60),
      pm: new TimeInMins(180),
    };
    const expected = new Goal(targetIntakeVolume, targetVoidInterval);

    expect(hydrateGoal(serialized).is(expected)).toBe(true);
  });
});

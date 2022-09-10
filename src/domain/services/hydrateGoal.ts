import type { SerializedGoal } from '@/domain/models/Goal';
import { Goal } from '@/domain/models/Goal';
import { TimeInMins } from '@/domain/models/TimeInMins';
import { VolumeInOz } from '@/domain/models/Volume';

function hydrateGoal(g: SerializedGoal) {
  const intake = new VolumeInOz(g.targetIntakeInOz);
  const intervals = {
    am: new TimeInMins(g.amTargetVoidIntervalInMins),
    pm: new TimeInMins(g.pmTargetVoidIntervalInMins),
  };
  return new Goal(intake, intervals);
}

export { hydrateGoal };

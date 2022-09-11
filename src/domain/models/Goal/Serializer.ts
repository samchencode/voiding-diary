import type { Goal } from '@/domain/models/Goal/Goal';
import type { SerializedGoal } from '@/domain/models/Goal/SerializedGoal';

class Serializer {
  static serialize(goal: Goal): SerializedGoal {
    const am = goal.getAmTargetVoidInterval();
    const pm = goal.getPmTargetVoidInterval();
    return {
      targetIntakeInOz: goal.getTargetIntake().getValue(),
      amTargetVoidIntervalInMins: am.getMinutesTotal(),
      pmTargetVoidIntervalInMins: pm.getMinutesTotal(),
    };
  }
}

export { Serializer };

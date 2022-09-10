import { Serializer } from '@/domain/models/Goal/Serializer';
import type { TimeInMins } from '@/domain/models/TimeInMins';
import type { VolumeInOz } from '@/domain/models/Volume';

type TargetVoidIntervalAmPm = {
  am: TimeInMins;
  pm: TimeInMins;
};

class Goal {
  private targetIntake: VolumeInOz;

  private targetVoidIntervals: TargetVoidIntervalAmPm;

  constructor(
    targetIntake: VolumeInOz,
    targetVoidIntervals: TargetVoidIntervalAmPm
  ) {
    this.targetIntake = targetIntake;
    this.targetVoidIntervals = targetVoidIntervals;
  }

  getTargetIntake() {
    return this.targetIntake;
  }

  getAmTargetVoidInterval() {
    return this.targetVoidIntervals.am;
  }

  getPmTargetVoidInterval() {
    return this.targetVoidIntervals.pm;
  }

  serialize() {
    return Serializer.serialize(this);
  }

  is(v: Goal) {
    const sameIntake = this.targetIntake.is(v.getTargetIntake());
    const sameAmInterval = this.targetVoidIntervals.am.is(
      v.getAmTargetVoidInterval()
    );
    const samePmInterval = this.targetVoidIntervals.pm.is(
      v.getPmTargetVoidInterval()
    );
    return sameIntake && sameAmInterval && samePmInterval;
  }
}

export { Goal };

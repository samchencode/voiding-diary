import type { DateAndTime } from '@/domain/models/DateAndTime';
import { Record } from '@/domain/models/Record/Record';
import type { Volume } from '@/domain/models/Volume';

class IntakeRecord extends Record {
  private urineVolume: Volume;

  constructor(dateAndTime: DateAndTime, urineVolume: Volume) {
    super(dateAndTime);
    this.urineVolume = urineVolume;
  }

  getIntakeVolumeInMl() {
    return this.urineVolume.toString();
  }

  is(otherRecord: IntakeRecord) {
    const hasSameDate = this.getDate() === otherRecord.getDate();
    const hasSameTime = this.getTime() === otherRecord.getTime();
    const hasSameVolume =
      this.getIntakeVolumeInMl() === otherRecord.getIntakeVolumeInMl();
    return hasSameDate && hasSameTime && hasSameVolume;
  }
}

export { IntakeRecord };

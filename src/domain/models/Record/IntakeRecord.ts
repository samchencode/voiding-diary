import type { DateAndTime } from '@/domain/models/DateAndTime';
import { Record } from '@/domain/models/Record/Record';
import type { Volume } from '@/domain/models/Volume';

class IntakeRecord extends Record {
  private urineVolume: Volume;

  constructor(dateAndTime: DateAndTime, urineVolume: Volume) {
    super(dateAndTime);
    this.urineVolume = urineVolume;
  }

  getIntakeVolumeString() {
    return this.urineVolume.toString();
  }

  is(otherRecord: IntakeRecord) {
    const hasSameDate = this.getDateString() === otherRecord.getDateString();
    const hasSameTime = this.getTimeString() === otherRecord.getTimeString();
    const hasSameVolume =
      this.getIntakeVolumeString() === otherRecord.getIntakeVolumeString();
    return hasSameDate && hasSameTime && hasSameVolume;
  }
}

export { IntakeRecord };

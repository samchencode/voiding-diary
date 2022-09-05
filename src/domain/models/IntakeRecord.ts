import type { DateAndTime } from '@/domain/models/DateAndTime';
import type { Volume } from '@/domain/models/Volume';

class IntakeRecord {
  private dateAndTime: DateAndTime;

  private urineVolume: Volume;

  constructor(dateAndTime: DateAndTime, urineVolume: Volume) {
    this.dateAndTime = dateAndTime;
    this.urineVolume = urineVolume;
  }

  getDate() {
    return this.dateAndTime.getDateString();
  }

  getTime() {
    return this.dateAndTime.getTimeString();
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

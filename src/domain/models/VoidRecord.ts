import type { DateAndTime } from '@/domain/models/DateAndTime';
import type { Volume } from '@/domain/models/Volume';

class VoidRecord {
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

  getUrineVolumeInMl() {
    return this.urineVolume.toString();
  }

  is(otherRecord: VoidRecord) {
    const hasSameDate = this.getDate() === otherRecord.getDate();
    const hasSameTime = this.getTime() === otherRecord.getTime();
    const hasSameVolume =
      this.getUrineVolumeInMl() === otherRecord.getUrineVolumeInMl();
    return hasSameDate && hasSameTime && hasSameVolume;
  }
}

export { VoidRecord };

import type { DateAndTime } from '@/domain/models/DateAndTime';
import { Record } from '@/domain/models/Record/Record';
import type { Volume } from '@/domain/models/Volume';

class VoidRecord extends Record {
  private urineVolume: Volume;

  constructor(dateAndTime: DateAndTime, urineVolume: Volume) {
    super(dateAndTime);
    this.urineVolume = urineVolume;
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

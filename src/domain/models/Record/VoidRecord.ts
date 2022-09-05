import type { DateAndTime } from '@/domain/models/DateAndTime';
import { Record } from '@/domain/models/Record/Record';
import type { Volume } from '@/domain/models/Volume';

class VoidRecord extends Record {
  private urineVolume: Volume;

  constructor(dateAndTime: DateAndTime, urineVolume: Volume) {
    super(dateAndTime);
    this.urineVolume = urineVolume;
  }

  getUrineVolumeString() {
    return this.urineVolume.toString();
  }

  is(otherRecord: VoidRecord) {
    const hasSameDate = this.getDateString() === otherRecord.getDateString();
    const hasSameTime = this.getTimeString() === otherRecord.getTimeString();
    const hasSameVolume =
      this.getUrineVolumeString() === otherRecord.getUrineVolumeString();
    return hasSameDate && hasSameTime && hasSameVolume;
  }
}

export { VoidRecord };

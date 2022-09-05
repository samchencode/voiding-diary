import type { DateAndTime } from '@/domain/models/DateAndTime';
import { Record } from '@/domain/models/Record/Record';
import type { RowSerializedRecord } from '@/domain/models/Record/RowSerializedRecord';
import { RowSerializer } from '@/domain/models/Record/RowSerializer';
import type { Volume } from '@/domain/models/Volume';

class IntakeRecord extends Record {
  private intakeVolume: Volume;

  static readonly type = 'intake';

  constructor(dateAndTime: DateAndTime, urineVolume: Volume) {
    super(dateAndTime);
    this.intakeVolume = urineVolume;
  }

  getIntakeVolumeString() {
    return this.intakeVolume.toString();
  }

  is(otherRecord: IntakeRecord) {
    const hasSameDate = this.getDateString() === otherRecord.getDateString();
    const hasSameTime = this.getTimeString() === otherRecord.getTimeString();
    const hasSameVolume =
      this.getIntakeVolumeString() === otherRecord.getIntakeVolumeString();
    return hasSameDate && hasSameTime && hasSameVolume;
  }

  serialize(): RowSerializedRecord {
    return RowSerializer.serialize(
      IntakeRecord.type,
      this.dateAndTime,
      this.intakeVolume
    );
  }
}

export { IntakeRecord };

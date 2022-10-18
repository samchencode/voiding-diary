import type { DateAndTime } from '@/domain/models/DateAndTime';
import { Record } from '@/domain/models/Record/Record';
import type { RecordId } from '@/domain/models/Record/RecordId';
import type { RecordVisitor } from '@/domain/models/Record/RecordVisitor';
import type { RowSerializedRecord } from '@/domain/models/Record/RowSerializedRecord';
import { RowSerializer } from '@/domain/models/Record/RowSerializer';
import type { VolumeInOz } from '@/domain/models/Volume';

class IntakeRecord extends Record {
  private intakeVolume: VolumeInOz;

  static readonly type = 'intake';

  constructor(
    dateAndTime: DateAndTime,
    intakeVolume: VolumeInOz,
    id?: RecordId
  ) {
    super(dateAndTime, id);
    this.intakeVolume = intakeVolume;
  }

  getIntakeVolume() {
    return this.intakeVolume;
  }

  getIntakeVolumeString() {
    return this.intakeVolume.toString();
  }

  getIntakeVolume() {
    return this.intakeVolume.valueOf();
  }

  is(otherRecord: IntakeRecord) {
    return this.getId().is(otherRecord.getId());
  }

  serialize(): RowSerializedRecord {
    return RowSerializer.serialize(
      IntakeRecord.type,
      this.dateAndTime,
      this.intakeVolume,
      this.id
    );
  }

  acceptVisitor(visitor: RecordVisitor): void {
    visitor.visitIntakeRecord(this);
  }
}

export { IntakeRecord };

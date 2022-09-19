import type { DateAndTime } from '@/domain/models/DateAndTime';
import { Record } from '@/domain/models/Record/Record';
import type { RecordId } from '@/domain/models/Record/RecordId';
import type { RecordVisitor } from '@/domain/models/Record/RecordVisitor';
import type { RowSerializedRecord } from '@/domain/models/Record/RowSerializedRecord';
import { RowSerializer } from '@/domain/models/Record/RowSerializer';
import type { Volume } from '@/domain/models/Volume';

class IntakeRecord extends Record {
  private intakeVolume: Volume;

  static readonly type = 'intake';

  constructor(dateAndTime: DateAndTime, urineVolume: Volume, id?: RecordId) {
    super(dateAndTime, id);
    this.intakeVolume = urineVolume;
  }

  getIntakeVolumeString() {
    return this.intakeVolume.toString();
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

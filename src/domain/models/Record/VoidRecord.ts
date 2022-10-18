import type { DateAndTime } from '@/domain/models/DateAndTime';
import { Record } from '@/domain/models/Record/Record';
import type { RecordId } from '@/domain/models/Record/RecordId';
import type { RecordVisitor } from '@/domain/models/Record/RecordVisitor';
import type { RowSerializedRecord } from '@/domain/models/Record/RowSerializedRecord';
import { RowSerializer } from '@/domain/models/Record/RowSerializer';
import type { Volume } from '@/domain/models/Volume';

class VoidRecord extends Record {
  private urineVolume: Volume;

  static readonly type = 'void';

  constructor(dateAndTime: DateAndTime, urineVolume: Volume, id?: RecordId) {
    super(dateAndTime, id);
    this.urineVolume = urineVolume;
  }

  getUrineVolume() {
    return this.urineVolume.valueOf();
  }

  getUrineVolumeString() {
    return this.urineVolume.toString();
  }

  is(otherRecord: VoidRecord) {
    return this.getId().is(otherRecord.getId());
  }

  serialize(): RowSerializedRecord {
    return RowSerializer.serialize(
      VoidRecord.type,
      this.dateAndTime,
      this.urineVolume,
      this.id
    );
  }

  acceptVisitor(visitor: RecordVisitor): void {
    visitor.visitVoidRecord(this);
  }
}

export { VoidRecord };

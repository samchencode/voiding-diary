import type { DateAndTime } from '@/domain/models/DateAndTime';
import { Record } from '@/domain/models/Record/Record';
import type { RecordVisitor } from '@/domain/models/Record/RecordVisitor';
import type { RowSerializedRecord } from '@/domain/models/Record/RowSerializedRecord';
import { RowSerializer } from '@/domain/models/Record/RowSerializer';
import type { Volume } from '@/domain/models/Volume';

class VoidRecord extends Record {
  private urineVolume: Volume;

  static readonly type = 'void';

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

  serialize(): RowSerializedRecord {
    return RowSerializer.serialize(
      VoidRecord.type,
      this.dateAndTime,
      this.urineVolume
    );
  }

  acceptVisitor(visitor: RecordVisitor): void {
    visitor.visitVoidRecord(this);
  }
}

export { VoidRecord };

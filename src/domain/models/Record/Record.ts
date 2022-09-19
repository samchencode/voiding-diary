import type { DateAndTime } from '@/domain/models/DateAndTime';
import { NullRecordId } from '@/domain/models/Record/NullRecordId';
import type { RecordId } from '@/domain/models/Record/RecordId';
import type { RecordVisitor } from '@/domain/models/Record/RecordVisitor';
import type { RowSerializedRecord } from '@/domain/models/Record/RowSerializedRecord';

abstract class Record {
  protected dateAndTime: DateAndTime;

  protected id: RecordId;

  constructor(dateAndTime: DateAndTime, id?: RecordId) {
    this.dateAndTime = dateAndTime;
    this.id = id ?? new NullRecordId();
  }

  getDateString() {
    return this.dateAndTime.getDateString();
  }

  getTimeString() {
    return this.dateAndTime.getTimeString();
  }

  getId() {
    return this.id;
  }

  abstract acceptVisitor(visitor: RecordVisitor): void;
  abstract serialize(): RowSerializedRecord;
}

export { Record };

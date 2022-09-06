import type { DateAndTime } from '@/domain/models/DateAndTime';
import type { RecordVisitor } from '@/domain/models/Record/RecordVisitor';
import type { RowSerializedRecord } from '@/domain/models/Record/RowSerializedRecord';

abstract class Record {
  protected dateAndTime: DateAndTime;

  constructor(dateAndTime: DateAndTime) {
    this.dateAndTime = dateAndTime;
  }

  getDateString() {
    return this.dateAndTime.getDateString();
  }

  getTimeString() {
    return this.dateAndTime.getTimeString();
  }

  abstract acceptVisitor(visitor: RecordVisitor): void;
  abstract serialize(): RowSerializedRecord;
}

export { Record };

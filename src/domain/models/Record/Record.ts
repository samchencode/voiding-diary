import type { DateAndTime } from '@/domain/models/DateAndTime';
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

  abstract serialize(): RowSerializedRecord;
}

export { Record };

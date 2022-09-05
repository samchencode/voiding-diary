import type { DateAndTime } from '@/domain/models/DateAndTime';

abstract class Record {
  private dateAndTime: DateAndTime;

  constructor(dateAndTime: DateAndTime) {
    this.dateAndTime = dateAndTime;
  }

  getDateString() {
    return this.dateAndTime.getDateString();
  }

  getTimeString() {
    return this.dateAndTime.getTimeString();
  }
}

export { Record };

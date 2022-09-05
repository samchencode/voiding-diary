import type { DateAndTime } from '@/domain/models/DateAndTime';

abstract class Record {
  private dateAndTime: DateAndTime;

  constructor(dateAndTime: DateAndTime) {
    this.dateAndTime = dateAndTime;
  }

  getDate() {
    return this.dateAndTime.getDateString();
  }

  getTime() {
    return this.dateAndTime.getTimeString();
  }
}

export { Record };

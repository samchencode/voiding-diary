import { LessThanOneMinuteError } from '@/domain/models/TimeInMins/LessThanOneMinuteError';
import { NegativeTimeError } from '@/domain/models/TimeInMins/NegativeTimeError';
import { TooManyMinutesError } from '@/domain/models/TimeInMins/TooManyMinutesError';

class TimeInMins {
  minutes: number;

  constructor(minutes: number) {
    if (minutes < 1) throw new LessThanOneMinuteError(minutes);
    this.minutes = minutes;
  }

  toString() {
    const padZeroToMakeTwoDigitNum = (n: number) =>
      n >= 10 ? `${n}` : `0${n}`;

    const h = this.getHours();
    const ss = padZeroToMakeTwoDigitNum(this.getMinutesWithinHour());
    return `${h}:${ss}`;
  }

  getHours() {
    return Math.floor(this.minutes / 60);
  }

  getMinutesWithinHour() {
    return this.minutes % 60;
  }

  getMinutesTotal() {
    return this.minutes;
  }

  is(value: TimeInMins) {
    return this.minutes === value.getMinutesTotal();
  }

  static fromHoursAndMinutes(hours: number, minutes: number) {
    if (hours < 0) throw new NegativeTimeError('hours', hours);
    if (minutes < 0) throw new NegativeTimeError('minutes', minutes);
    if (minutes >= 60) throw new TooManyMinutesError(minutes);
    const totalMinutes = hours * 60 + minutes;
    return new TimeInMins(totalMinutes);
  }
}

export { TimeInMins };

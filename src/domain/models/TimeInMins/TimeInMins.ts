class TimeInMins {
  minutes: number;

  constructor(minutes: number) {
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
    const totalMinutes = hours * 60 + minutes;
    return new TimeInMins(totalMinutes);
  }
}

export { TimeInMins };

class DateAndTime {
  private value: Date;

  constructor(value: Date) {
    this.value = value;
  }

  is(dateAndTime: DateAndTime) {
    return this.value.getTime() === dateAndTime.getTimeInMilliseconds();
  }

  getTimeInMilliseconds() {
    return this.value.getTime();
  }

  getDateString() {
    const formatter = Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    return formatter.format(this.value);
  }

  getTimeString() {
    const formatter = Intl.DateTimeFormat('en', {
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h12',
    });

    return formatter.format(this.value);
  }

  toString() {
    return this.value.toString();
  }
}

export { DateAndTime };

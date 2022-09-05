class LessThanOneMinuteError extends Error {
  name = 'LessThanOneMinuteError';

  constructor(totalMinutesReceived: number) {
    super();
    this.message = `Minutes should be at least one. Received ${totalMinutesReceived}`;
  }
}

export { LessThanOneMinuteError };

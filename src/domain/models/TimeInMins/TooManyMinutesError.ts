class TooManyMinutesError extends Error {
  name = 'TooManyMinutesError';

  constructor(minutesReceived: number) {
    super();
    this.message = `Minutes value should be less than 60. Received ${minutesReceived}`;
  }
}

export { TooManyMinutesError };

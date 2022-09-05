class NegativeTimeError extends Error {
  name = 'NegativeTimeError';

  constructor(field: string, valueGiven: number) {
    super();
    this.message = `The ${field} should be non-negative. Received ${valueGiven}.`;
  }
}

export { NegativeTimeError };

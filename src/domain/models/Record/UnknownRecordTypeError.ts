class UnknownRecordTypeError extends Error {
  name = 'UnknownRecordTypeError';

  constructor(typeReceived: string) {
    super();
    this.message = `Unknown record type: ${typeReceived}`;
  }
}

export { UnknownRecordTypeError };

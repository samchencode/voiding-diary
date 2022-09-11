class FieldEmptyError extends Error {
  name = 'FieldEmptyError';

  constructor() {
    super();
    this.message = 'All fields must have a value';
  }
}

export { FieldEmptyError };

class RecordId {
  private id;

  constructor(id: string) {
    this.id = id;
  }

  getValue() {
    return this.id;
  }

  toString() {
    return this.getValue();
  }

  is(id: RecordId) {
    return this.id === id.getValue();
  }
}

export { RecordId };

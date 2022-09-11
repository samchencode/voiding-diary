class UsedBeforeReadyError extends Error {
  name = 'UsedBeforeReadyError';

  constructor(decoratorName: string) {
    super();
    this.message = `${decoratorName} decorator was used before it was ready`;
  }
}

export { UsedBeforeReadyError };

class NegativeVolumeError extends Error {
  name = 'NegativeVolumeError';

  constructor(volumeReceived: number) {
    super();
    this.message = `Volume should not be negative. Received ${volumeReceived}`;
  }
}

export { NegativeVolumeError };

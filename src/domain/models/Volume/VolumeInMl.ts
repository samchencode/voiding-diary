import type { Volume } from '@/domain/models/Volume/Volume';

class VolumeInMl implements Volume {
  private ml: number;

  constructor(milliliters: number) {
    this.ml = milliliters;
  }

  is(value: Volume): boolean {
    if (!(value instanceof VolumeInMl)) return false;
    return this.ml === value.getValue();
  }

  getValue() {
    return this.ml;
  }

  valueOf() {
    return this.getValue();
  }

  toString() {
    return `${this.ml} mL`;
  }
}

export { VolumeInMl };

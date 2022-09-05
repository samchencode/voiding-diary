import { NegativeVolumeError } from '@/domain/models/Volume/NegativeVolumeError';
import type { Volume } from '@/domain/models/Volume/Volume';

class VolumeInMl implements Volume {
  private ml: number;

  constructor(milliliters: number) {
    if (milliliters < 0) throw new NegativeVolumeError(milliliters);
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

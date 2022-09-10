import { NegativeVolumeError } from '@/domain/models/Volume/NegativeVolumeError';
import type { Volume } from '@/domain/models/Volume/Volume';

class VolumeInOz implements Volume {
  private oz: number;

  constructor(ounces: number) {
    if (ounces < 0) throw new NegativeVolumeError(ounces);
    this.oz = ounces;
  }

  is(value: Volume): boolean {
    if (!(value instanceof VolumeInOz)) return false;
    return this.oz === value.getValue();
  }

  getValue() {
    return this.oz;
  }

  valueOf() {
    return this.getValue();
  }

  toString() {
    return `${this.oz} oz`;
  }
}

export { VolumeInOz };

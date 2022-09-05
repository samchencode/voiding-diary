import type { Volume } from '@/domain/models/Volume/Volume';

class UnknownVolume implements Volume {
  /* eslint-disable class-methods-use-this */
  is(value: Volume): boolean {
    const isUnknown = value instanceof UnknownVolume === true;
    return isUnknown;
  }

  valueOf(): number {
    return -1;
  }

  toString() {
    return '';
  }
}

export { UnknownVolume };

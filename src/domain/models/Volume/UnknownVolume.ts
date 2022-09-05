import type { Volume } from '@/domain/models/Volume/Volume';

class UnknownVolume implements Volume {
  /* eslint-disable class-methods-use-this */
  is(value: Volume): boolean {
    const isUnknown = value instanceof UnknownVolume === true;
    return isUnknown;
  }

  toString() {
    return '';
  }
}

export { UnknownVolume };

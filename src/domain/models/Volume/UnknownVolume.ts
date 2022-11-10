import type { Volume } from '@/domain/models/Volume/Volume';

class UnknownVolume implements Volume {
  is(value: Volume): boolean {
    const isUnknown = value instanceof UnknownVolume === true;
    return isUnknown;
  }

  getValueString(): string {
    return '';
  }

  getUnitString(): string {
    return '';
  }

  valueOf(): number {
    return -1;
  }

  toString() {
    return '';
  }
}

export { UnknownVolume };

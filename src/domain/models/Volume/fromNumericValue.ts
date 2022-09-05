import { UnknownVolume } from '@/domain/models/Volume/UnknownVolume';
import type { Volume } from '@/domain/models/Volume/Volume';
import { VolumeInMl } from '@/domain/models/Volume/VolumeInMl';

function fromNumericValue(val: number): Volume {
  if (val === -1) return new UnknownVolume();
  return new VolumeInMl(val);
}

export { fromNumericValue };

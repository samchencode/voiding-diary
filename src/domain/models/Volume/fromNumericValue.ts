import { UnknownVolume } from '@/domain/models/Volume/UnknownVolume';
import type { Volume } from '@/domain/models/Volume/Volume';
import { VolumeInOz } from '@/domain/models/Volume/VolumeInOz';

function fromNumericValue(val: number): Volume {
  if (val === -1) return new UnknownVolume();
  return new VolumeInOz(val);
}

export { fromNumericValue };

import type { Volume } from '@/domain/models/Volume';
import { VolumeInMl, UnknownVolume } from '@/domain/models/Volume';

describe('Volume', () => {
  describe('Instantiation', () => {
    it('should create new unknown volume value object', () => {
      const create = () => new UnknownVolume();
      expect(create).not.toThrowError();
    });

    it('should create new mL volume value object', () => {
      const create = () => new VolumeInMl(0);
      expect(create).not.toThrowError();
    });
  });

  describe('behavior', () => {
    it('should toString to empty string if unknown', () => {
      const vol: Volume = new UnknownVolume();
      expect(vol.toString()).toBe('');
    });

    it('should toString to a number of mL', () => {
      const vol: Volume = new VolumeInMl(2);
      expect(vol.toString()).toBe('2 mL');
    });
  });
});

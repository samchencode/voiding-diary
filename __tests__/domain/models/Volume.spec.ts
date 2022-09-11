import type { Volume } from '@/domain/models/Volume';
import {
  fromNumericValue,
  VolumeInOz,
  UnknownVolume,
} from '@/domain/models/Volume';

describe('Volume', () => {
  describe('Instantiation', () => {
    it('should create new unknown volume value object', () => {
      const create = () => new UnknownVolume();
      expect(create).not.toThrowError();
    });

    it('should create new oz volume value object', () => {
      const create = () => new VolumeInOz(0);
      expect(create).not.toThrowError();
    });

    it('should create unknown volume from -1', () => {
      const vol = fromNumericValue(-1);
      expect(vol.is(new UnknownVolume())).toBe(true);
    });

    it('should create volume in oz from positive number', () => {
      const vol = fromNumericValue(7);
      expect(vol.is(new VolumeInOz(7))).toBe(true);
    });

    it('should throw error if negative', () => {
      const boom = () => new VolumeInOz(-1);
      expect(boom).toThrowError('negative');
    });
  });

  describe('behavior', () => {
    it('should toString to empty string if unknown', () => {
      const vol: Volume = new UnknownVolume();
      expect(vol.toString()).toBe('');
    });

    it('should toString to a number of oz', () => {
      const vol: Volume = new VolumeInOz(2);
      expect(vol.toString()).toBe('2 oz');
    });

    it('should be same as another object with equal volume', () => {
      const vol1 = new VolumeInOz(1);
      const vol2 = new VolumeInOz(1);
      expect(vol1.is(vol2)).toBe(true);

      const vol3 = new UnknownVolume();
      const vol4 = new UnknownVolume();
      expect(vol3.is(vol4)).toBe(true);

      const vol5 = new VolumeInOz(2);
      expect(vol1.is(vol5)).toBe(false);
    });

    it('should not be equal to unknown if its known', () => {
      const vol = new VolumeInOz(2);
      const unk = new UnknownVolume();
      expect(vol.is(unk)).toBe(false);
    });

    it('should convert unknown to -1 on valueOf', () => {
      const vol = new UnknownVolume();
      expect(+vol).toBe(-1);
      expect(Number(vol)).toBe(-1);
    });

    it('should convert volume to number of ounces', () => {
      const vol = new VolumeInOz(8);
      expect(+vol).toBe(8);
      expect(Number(vol)).toBe(8);
    });
  });
});

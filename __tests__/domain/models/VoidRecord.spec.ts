import { DateAndTime } from '@/domain/models/DateAndTime';
import { VoidRecord } from '@/domain/models/VoidRecord';
import { VolumeInMl } from '@/domain/models/Volume';

describe('Record', () => {
  describe('Instantiation', () => {
    it('should create new void record', () => {
      const datetime = new DateAndTime(new Date(0));
      const urineVolume = new VolumeInMl(8);

      const create = () => new VoidRecord(datetime, urineVolume);

      expect(create).not.toThrowError();
    });
  });

  describe('Behavior', () => {
    it('should get date of void', () => {
      const datetime1 = new DateAndTime(new Date(0));
      const urineVolume = new VolumeInMl(8);

      const voidRecord1 = new VoidRecord(datetime1, urineVolume);

      expect(voidRecord1.getTime()).toBe('12:00 AM');
      expect(voidRecord1.getDate()).toBe('Jan 1, 1970');

      const datetime2 = new DateAndTime(new Date(1662318939966));

      const voidRecord2 = new VoidRecord(datetime2, urineVolume);

      expect(voidRecord2.getTime()).toBe('7:15 PM');
      expect(voidRecord2.getDate()).toBe('Sep 4, 2022');
    });

    it('should get the volume voided', () => {
      const datetime = new DateAndTime(new Date(0));
      const urineVolume = new VolumeInMl(8);

      const voidRecord = new VoidRecord(datetime, urineVolume);

      expect(voidRecord.getUrineVolumeInMl()).toBe('8 mL');
    });
  });
});

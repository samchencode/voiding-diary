import { DateAndTime } from '@/domain/models/DateAndTime';
import { IntakeRecord } from '@/domain/models/Record';
import { VolumeInMl } from '@/domain/models/Volume';

describe('IntakeRecord', () => {
  describe('Instantiation', () => {
    it('should create an intake record', () => {
      const datetime = new DateAndTime(new Date(0));
      const intakeVolume = new VolumeInMl(2);
      const create = () => new IntakeRecord(datetime, intakeVolume);
      expect(create).not.toThrowError();
    });
  });

  describe('Behavior', () => {
    it('should get date of void', () => {
      const datetime1 = new DateAndTime(new Date(0));
      const urineVolume = new VolumeInMl(8);

      const voidRecord1 = new IntakeRecord(datetime1, urineVolume);

      expect(voidRecord1.getTime()).toBe('12:00 AM');
      expect(voidRecord1.getDate()).toBe('Jan 1, 1970');

      const datetime2 = new DateAndTime(new Date(1662318939966));

      const voidRecord2 = new IntakeRecord(datetime2, urineVolume);

      expect(voidRecord2.getTime()).toBe('7:15 PM');
      expect(voidRecord2.getDate()).toBe('Sep 4, 2022');
    });

    it('should get the volume voided', () => {
      const datetime = new DateAndTime(new Date(0));
      const urineVolume = new VolumeInMl(8);

      const voidRecord = new IntakeRecord(datetime, urineVolume);

      expect(voidRecord.getIntakeVolumeInMl()).toBe('8 mL');
    });
  });
});

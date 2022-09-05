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
    it('should get date of intake', () => {
      const datetime1 = new DateAndTime(new Date(0));
      const urineVolume = new VolumeInMl(8);

      const intakeRecord1 = new IntakeRecord(datetime1, urineVolume);

      expect(intakeRecord1.getTime()).toBe('12:00 AM');
      expect(intakeRecord1.getDate()).toBe('Jan 1, 1970');

      const datetime2 = new DateAndTime(new Date(1662318939966));

      const intakeRecord2 = new IntakeRecord(datetime2, urineVolume);

      expect(intakeRecord2.getTime()).toBe('7:15 PM');
      expect(intakeRecord2.getDate()).toBe('Sep 4, 2022');
    });

    it('should get the volume intake', () => {
      const datetime = new DateAndTime(new Date(0));
      const urineVolume = new VolumeInMl(8);

      const intakeRecord = new IntakeRecord(datetime, urineVolume);

      expect(intakeRecord.getIntakeVolumeInMl()).toBe('8 mL');
    });
  });
});

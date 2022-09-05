import { DateAndTime } from '@/domain/models/DateAndTime';
import { IntakeRecord } from '@/domain/models/Record';
import { UnknownVolume, VolumeInMl } from '@/domain/models/Volume';

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

      expect(intakeRecord1.getTimeString()).toBe('12:00 AM');
      expect(intakeRecord1.getDateString()).toBe('Jan 1, 1970');

      const datetime2 = new DateAndTime(new Date(1662318939966));

      const intakeRecord2 = new IntakeRecord(datetime2, urineVolume);

      expect(intakeRecord2.getTimeString()).toBe('7:15 PM');
      expect(intakeRecord2.getDateString()).toBe('Sep 4, 2022');
    });

    it('should get the volume intake', () => {
      const datetime = new DateAndTime(new Date(0));
      const urineVolume = new VolumeInMl(8);

      const intakeRecord = new IntakeRecord(datetime, urineVolume);

      expect(intakeRecord.getIntakeVolumeString()).toBe('8 mL');
    });

    it('should equal other record with same intake and datetime', () => {
      const datetime1 = new DateAndTime(new Date(0));
      const intakeVolume1 = new VolumeInMl(2);
      const intake1 = new IntakeRecord(datetime1, intakeVolume1);
      const datetime2 = new DateAndTime(new Date(0));
      const intakeVolume2 = new VolumeInMl(2);
      const intake2 = new IntakeRecord(datetime2, intakeVolume2);
      expect(intake1.is(intake2)).toBe(true);

      const datetime3 = new DateAndTime(new Date(3600000));
      const intakeVolume3 = new VolumeInMl(2);
      const intake3 = new IntakeRecord(datetime3, intakeVolume3);
      expect(intake1.is(intake3)).toBe(false);

      const datetime4 = new DateAndTime(new Date(0));
      const intakeVolume4 = new VolumeInMl(0);
      const intake4 = new IntakeRecord(datetime4, intakeVolume4);
      expect(intake1.is(intake4)).toBe(false);
    });

    it('should serialize into a record object for storage', () => {
      const datetime1 = new DateAndTime(new Date(0));
      const intakeVolume1 = new VolumeInMl(2);
      const serialized1 = new IntakeRecord(
        datetime1,
        intakeVolume1
      ).serialize();
      const expected1 = {
        type: 'intake',
        volumeMl: 2,
        timestamp: 0,
      };
      expect(serialized1).toEqual(expected1);

      const datetime2 = new DateAndTime(new Date(1000000));
      const intakeVolume2 = new UnknownVolume();
      const serialized2 = new IntakeRecord(
        datetime2,
        intakeVolume2
      ).serialize();
      const expected2 = {
        type: 'intake',
        volumeMl: -1,
        timestamp: 1000000,
      };
      expect(serialized2).toEqual(expected2);
    });
  });
});

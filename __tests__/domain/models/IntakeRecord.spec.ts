import { DateAndTime } from '@/domain/models/DateAndTime';
import { fromRecordType, IntakeRecord } from '@/domain/models/Record';
import { RecordId } from '@/domain/models/Record/RecordId';
import { UnknownVolume, VolumeInOz } from '@/domain/models/Volume';

describe('IntakeRecord', () => {
  describe('Instantiation', () => {
    it('should create an intake record', () => {
      const datetime = new DateAndTime(new Date(0));
      const intakeVolume = new VolumeInOz(2);
      const create = () => new IntakeRecord(datetime, intakeVolume);
      expect(create).not.toThrowError();
    });

    it('should create providing record type by string', () => {
      const datetime = new DateAndTime(new Date(0));
      const intakeVolume = new VolumeInOz(8);

      const intakeRecord = fromRecordType('intake', datetime, intakeVolume);
      expect(intakeRecord).toBeInstanceOf(IntakeRecord);
    });
  });

  describe('Behavior', () => {
    it('should get date of intake', () => {
      const datetime1 = new DateAndTime(new Date(0));
      const intakeVolume = new VolumeInOz(8);

      const intakeRecord1 = new IntakeRecord(datetime1, intakeVolume);

      expect(intakeRecord1.getTimeString()).toBe('12:00 AM');
      expect(intakeRecord1.getDateString()).toBe('Jan 1, 1970');

      const datetime2 = new DateAndTime(new Date(1662318939966));

      const intakeRecord2 = new IntakeRecord(datetime2, intakeVolume);

      expect(intakeRecord2.getTimeString()).toBe('7:15 PM');
      expect(intakeRecord2.getDateString()).toBe('Sep 4, 2022');
    });

    it('should get the volume intake', () => {
      const datetime = new DateAndTime(new Date(0));
      const urineVolume = new VolumeInOz(8);

      const intakeRecord = new IntakeRecord(datetime, urineVolume);

      expect(intakeRecord.getIntakeVolumeString()).toBe('8 oz');
    });

    it('should equal other record with same id', () => {
      const datetime1 = new DateAndTime(new Date(0));
      const intakeVolume1 = new VolumeInOz(2);
      const id1 = new RecordId('1');
      const intake1 = new IntakeRecord(datetime1, intakeVolume1, id1);

      // same values same id
      const datetime2 = new DateAndTime(new Date(0));
      const intakeVolume2 = new VolumeInOz(2);
      const id2 = new RecordId('1');
      const intake2 = new IntakeRecord(datetime2, intakeVolume2, id2);
      expect(intake1.is(intake2)).toBe(true);

      // diff values same id
      const datetime3 = new DateAndTime(new Date(3600000));
      const intakeVolume3 = new VolumeInOz(2);
      const id3 = new RecordId('1');
      const intake3 = new IntakeRecord(datetime3, intakeVolume3, id3);
      expect(intake1.is(intake3)).toBe(true);

      // same values diff id
      const datetime4 = new DateAndTime(new Date(0));
      const intakeVolume4 = new VolumeInOz(2);
      const id4 = new RecordId('2');
      const intake4 = new IntakeRecord(datetime4, intakeVolume4, id4);
      expect(intake1.is(intake4)).toBe(false);
    });

    it('should serialize into a record object for storage', () => {
      const datetime1 = new DateAndTime(new Date(0));
      const intakeVolume1 = new VolumeInOz(2);
      const id = new RecordId('1');
      const serialized1 = new IntakeRecord(
        datetime1,
        intakeVolume1,
        id
      ).serialize();
      const expected1 = {
        type: 'intake',
        volumeOz: 2,
        timestamp: 0,
        id: '1',
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
        volumeOz: -1,
        timestamp: 1000000,
        id: 'NULL',
      };
      expect(serialized2).toEqual(expected2);
    });
  });
});

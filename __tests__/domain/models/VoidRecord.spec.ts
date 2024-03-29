import { DateAndTime } from '@/domain/models/DateAndTime';
import { fromRecordType, VoidRecord } from '@/domain/models/Record';
import { RecordId } from '@/domain/models/Record/RecordId';
import { UnknownVolume, VolumeInOz } from '@/domain/models/Volume';

describe('VoidRecord', () => {
  describe('Instantiation', () => {
    it('should create new void record', () => {
      const datetime = new DateAndTime(new Date(0));
      const urineVolume = new VolumeInOz(8);

      const create = () => new VoidRecord(datetime, urineVolume);

      expect(create).not.toThrowError();
    });

    it('should create providing record type by string', () => {
      const datetime = new DateAndTime(new Date(0));
      const urineVolume = new VolumeInOz(8);

      const voidRecord = fromRecordType('void', datetime, urineVolume);
      expect(voidRecord).toBeInstanceOf(VoidRecord);
    });
  });

  describe('Behavior', () => {
    it('should get date of void', () => {
      const datetime1 = new DateAndTime(new Date(0));
      const urineVolume = new VolumeInOz(8);

      const voidRecord1 = new VoidRecord(datetime1, urineVolume);

      expect(voidRecord1.getTimeString()).toBe('12:00 AM');
      expect(voidRecord1.getDateString()).toBe('Jan 1, 1970');

      const datetime2 = new DateAndTime(new Date(1662318939966));

      const voidRecord2 = new VoidRecord(datetime2, urineVolume);

      expect(voidRecord2.getTimeString()).toBe('7:15 PM');
      expect(voidRecord2.getDateString()).toBe('Sep 4, 2022');
    });

    it('should get the volume voided', () => {
      const datetime = new DateAndTime(new Date(0));
      const urineVolume = new VolumeInOz(8);

      const voidRecord = new VoidRecord(datetime, urineVolume);

      expect(voidRecord.getUrineVolumeString()).toBe('8 oz');
    });
  });

  it('should equal other record with same id', () => {
    const datetime1 = new DateAndTime(new Date(0));
    const urineVolume1 = new VolumeInOz(2);
    const id1 = new RecordId('1');
    const void1 = new VoidRecord(datetime1, urineVolume1, id1);

    // same values same id
    const datetime2 = new DateAndTime(new Date(0));
    const urineVolume2 = new VolumeInOz(2);
    const id2 = new RecordId('1');
    const void2 = new VoidRecord(datetime2, urineVolume2, id2);
    expect(void1.is(void2)).toBe(true);

    // diff values same id
    const datetime3 = new DateAndTime(new Date(3600000));
    const urineVolume3 = new VolumeInOz(2);
    const id3 = new RecordId('1');
    const void3 = new VoidRecord(datetime3, urineVolume3, id3);
    expect(void1.is(void3)).toBe(true);

    // same values diff id
    const datetime4 = new DateAndTime(new Date(0));
    const urineVolume4 = new VolumeInOz(2);
    const id4 = new RecordId('2');
    const void4 = new VoidRecord(datetime4, urineVolume4, id4);
    expect(void1.is(void4)).toBe(false);
  });

  it('should serialize into a record object for storage', () => {
    const datetime1 = new DateAndTime(new Date(0));
    const voidVolume1 = new VolumeInOz(2);
    const id = new RecordId('1');
    const serialized1 = new VoidRecord(datetime1, voidVolume1, id).serialize();
    const expected1 = {
      type: 'void',
      volumeOz: 2,
      timestamp: 0,
      id: '1',
    };
    expect(serialized1).toEqual(expected1);

    const datetime2 = new DateAndTime(new Date(1000000));
    const voidVolume2 = new UnknownVolume();
    const serialized2 = new VoidRecord(datetime2, voidVolume2).serialize();
    const expected2 = {
      type: 'void',
      volumeOz: -1,
      timestamp: 1000000,
      id: 'NULL',
    };
    expect(serialized2).toEqual(expected2);
  });
});

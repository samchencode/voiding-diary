import { DateAndTime } from '@/domain/models/DateAndTime';
import { VoidRecord } from '@/domain/models/Record';
import { UnknownVolume, VolumeInMl } from '@/domain/models/Volume';

describe('VoidRecord', () => {
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

      expect(voidRecord1.getTimeString()).toBe('12:00 AM');
      expect(voidRecord1.getDateString()).toBe('Jan 1, 1970');

      const datetime2 = new DateAndTime(new Date(1662318939966));

      const voidRecord2 = new VoidRecord(datetime2, urineVolume);

      expect(voidRecord2.getTimeString()).toBe('7:15 PM');
      expect(voidRecord2.getDateString()).toBe('Sep 4, 2022');
    });

    it('should get the volume voided', () => {
      const datetime = new DateAndTime(new Date(0));
      const urineVolume = new VolumeInMl(8);

      const voidRecord = new VoidRecord(datetime, urineVolume);

      expect(voidRecord.getUrineVolumeString()).toBe('8 mL');
    });
  });

  it('should equal other record with same urine volume and datetime', () => {
    const datetime1 = new DateAndTime(new Date(0));
    const urineVolume1 = new VolumeInMl(2);
    const void1 = new VoidRecord(datetime1, urineVolume1);
    const datetime2 = new DateAndTime(new Date(0));
    const urineVolume2 = new VolumeInMl(2);
    const void2 = new VoidRecord(datetime2, urineVolume2);
    expect(void1.is(void2)).toBe(true);

    const datetime3 = new DateAndTime(new Date(3600000));
    const urineVolume3 = new VolumeInMl(2);
    const void3 = new VoidRecord(datetime3, urineVolume3);
    expect(void1.is(void3)).toBe(false);

    const datetime4 = new DateAndTime(new Date(0));
    const urineVolume4 = new VolumeInMl(0);
    const void4 = new VoidRecord(datetime4, urineVolume4);
    expect(void1.is(void4)).toBe(false);
  });

  it('should serialize into a record object for storage', () => {
    const datetime1 = new DateAndTime(new Date(0));
    const voidVolume1 = new VolumeInMl(2);
    const serialized1 = new VoidRecord(datetime1, voidVolume1).serialize();
    const expected1 = {
      type: 'void',
      volumeMl: 2,
      timestamp: 0,
    };
    expect(serialized1).toEqual(expected1);

    const datetime2 = new DateAndTime(new Date(1000000));
    const voidVolume2 = new UnknownVolume();
    const serialized2 = new VoidRecord(datetime2, voidVolume2).serialize();
    const expected2 = {
      type: 'void',
      volumeMl: -1,
      timestamp: 1000000,
    };
    expect(serialized2).toEqual(expected2);
  });
});

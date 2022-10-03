import { DateAndTime } from '@/domain/models/DateAndTime';
import { IntakeRecord, RecordId, VoidRecord } from '@/domain/models/Record';
import { Report } from '@/domain/models/Report/Report';
import { VolumeInOz } from '@/domain/models/Volume';

describe('Report', () => {
  describe('Instantiation', () => {
    it('should be instantiated with a list of records', () => {
      const records = [
        new VoidRecord(
          new DateAndTime(new Date(0)),
          new VolumeInOz(2),
          new RecordId('0')
        ),
        new IntakeRecord(
          new DateAndTime(new Date(1)),
          new VolumeInOz(2),
          new RecordId('1')
        ),
      ];

      const create = () => new Report(records);
      expect(create).not.toThrowError();
    });
  });

  describe('Behavior', () => {
    it('should get records', () => {
      const records = [
        new VoidRecord(
          new DateAndTime(new Date(0)),
          new VolumeInOz(2),
          new RecordId('0')
        ),
        new IntakeRecord(
          new DateAndTime(new Date(1)),
          new VolumeInOz(2),
          new RecordId('1')
        ),
      ];

      const report = new Report(records);

      expect(report.getRecords()).toEqual(records);
    });
  });
});

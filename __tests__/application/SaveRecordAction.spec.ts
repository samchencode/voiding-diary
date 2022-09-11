import { SaveRecordAction } from '@/application/SaveRecordAction';
import { DateAndTime } from '@/domain/models/DateAndTime';
import { IntakeRecord, VoidRecord } from '@/domain/models/Record';
import { VolumeInOz } from '@/domain/models/Volume';
import { FakeRecordRepository } from '@/infrastructure/persistence/fake/FakeRecordRepository';

describe('SaveRecordAction', () => {
  describe('Instantiation', () => {
    it('should create new action given repo', () => {
      const repo = new FakeRecordRepository();
      const create = () => new SaveRecordAction(repo);
      expect(create).not.toThrowError();
    });
  });

  describe('Behavior', () => {
    it('should save a record', () => {
      const datetime1 = new DateAndTime(new Date(100000));
      const intakeVolume = new VolumeInOz(48);
      const record1 = new IntakeRecord(datetime1, intakeVolume);

      const datetime2 = new DateAndTime(new Date(1234220));
      const urineVolume = new VolumeInOz(8);
      const record2 = new VoidRecord(datetime2, urineVolume);

      const repo = new FakeRecordRepository();
      const action = new SaveRecordAction(repo);
      return action
        .execute(record1)
        .then(() => action.execute(record2))
        .then(() => {
          expect(repo.mockData[0]).toEqual(record2.serialize());
          expect(repo.mockData[1]).toEqual(record1.serialize());
        });
    });
  });
});

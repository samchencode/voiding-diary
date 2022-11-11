import { GetRecordByIdAction } from '@/application/GetRecordByIdAction';
import { DateAndTime } from '@/domain/models/DateAndTime';
import { RecordId, VoidRecord } from '@/domain/models/Record';
import { VolumeInOz } from '@/domain/models/Volume';
import { FakeRecordRepository } from '@/infrastructure/persistence/fake/FakeRecordRepository';

describe('GetRecordByIdAction', () => {
  describe('Instantiation', () => {
    it('should create action given repo', () => {
      const repo = new FakeRecordRepository();
      const create = () => new GetRecordByIdAction(repo);
      expect(create).not.toThrowError();
    });
  });

  describe('Behavior', () => {
    it('should get by id', async () => {
      const repo = new FakeRecordRepository();
      const action = new GetRecordByIdAction(repo);
      const result = await action.execute(new RecordId('18'));

      expect(result).toBeInstanceOf(VoidRecord);
      const voidRecord = result as VoidRecord;

      const expectedDateAndTime = new DateAndTime(new Date(1661435467000));
      expect(voidRecord.getDateAndTime().is(expectedDateAndTime)).toBe(true);

      const expectedVolume = new VolumeInOz(785);
      expect(voidRecord.getUrineVolume().is(expectedVolume)).toBe(true);
    });
  });
});

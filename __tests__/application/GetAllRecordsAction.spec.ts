import { GetAllRecordsAction } from '@/application/GetAllRecordsAction';
import { FakeRecordRepository } from '@/infrastructure/persistence/fake/FakeRecordRepository';

describe('GetAllRecordsAction', () => {
  describe('Instatiation', () => {
    it('should create action given repo', () => {
      const repo = new FakeRecordRepository();
      const create = () => new GetAllRecordsAction(repo);
      expect(create).not.toThrowError();
    });
  });

  describe('Behavior', () => {
    it('should get all records', async () => {
      const repo = new FakeRecordRepository();
      const action = new GetAllRecordsAction(repo);
      const records = await action.execute();
      expect(records.length).toEqual(1000);
      expect(records[0].serialize()).toEqual({
        timestamp: 1662262790000,
        type: 'intake',
        volumeMl: 866,
      });
      expect(records[999].serialize()).toEqual({
        timestamp: 1609485765000,
        type: 'void',
        volumeMl: 352,
      });
    });
  });
});
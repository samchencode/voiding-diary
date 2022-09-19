import { GetTodaysRecordsAction } from '@/application/GetTodaysRecordsAction';
import { FakeRecordRepository } from '@/infrastructure/persistence/fake/FakeRecordRepository';

describe('GetTodaysRecordsAction', () => {
  describe('Instantiation', () => {
    it('should create action given repo', () => {
      const repo = new FakeRecordRepository();
      const create = () => new GetTodaysRecordsAction(repo);
      expect(create).not.toThrowError();
    });
  });

  describe('Behavior', () => {
    beforeAll(() => {
      jest
        .useFakeTimers({ advanceTimers: true })
        .setSystemTime(new Date('9/4/2022, 11:59:59 PM'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should get the records between midnight today and midnight tomorrow', () => {
      const expected = [
        {
          id: '0',
          type: 'intake',
          volumeOz: 866,
          timestamp: 1662262790000,
        },
        {
          id: '1',
          type: 'void',
          volumeOz: 491,
          timestamp: 1662250687000,
        },
      ];

      const repo = new FakeRecordRepository();
      const action = new GetTodaysRecordsAction(repo);
      return action.execute().then((r) => {
        expect(r.length).toBe(expected.length);
        expect(r[0].serialize()).toEqual(expected[0]);
        expect(r[1].serialize()).toEqual(expected[1]);
      });
    });
  });
});

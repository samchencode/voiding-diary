import { GetGoalAction } from '@/application/GetGoalAction';
import { Goal } from '@/domain/models/Goal';
import { TimeInMins } from '@/domain/models/TimeInMins';
import { VolumeInMl } from '@/domain/models/Volume';
import { FakeGoalRepository } from '@/infrastructure/persistence/fake/FakeGoalRepository';

describe('GetGoalAction', () => {
  describe('Instantiation', () => {
    it('should create action given goal repo', () => {
      const repo = new FakeGoalRepository();
      const create = () => new GetGoalAction(repo);
      expect(create).not.toThrowError();
    });
  });

  describe('behavior', () => {
    it('should throw error if no goal exists', async () => {
      const repo = new FakeGoalRepository();
      const action = new GetGoalAction(repo);
      const boom = action.execute();
      await expect(boom).rejects.toThrowError('Goal could not be found');
    });

    it('should get goal if it exists', async () => {
      const goal = new Goal(new VolumeInMl(32), {
        am: new TimeInMins(180),
        pm: new TimeInMins(240),
      });
      const repo = new FakeGoalRepository(goal);
      const action = new GetGoalAction(repo);
      const result = await action.execute();
      expect(result.is(goal)).toBe(true);
    });
  });
});

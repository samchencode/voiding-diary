import { SaveGoalAction } from '@/application/SaveGoalAction';
import { Goal } from '@/domain/models/Goal';
import { TimeInMins } from '@/domain/models/TimeInMins';
import { VolumeInMl } from '@/domain/models/Volume';
import { FakeGoalRepository } from '@/infrastructure/persistence/fake/FakeGoalRepository';

describe('SaveGoalAction', () => {
  describe('Instantiation', () => {
    it('should create new action given repo', () => {
      const repo = new FakeGoalRepository();
      const create = () => new SaveGoalAction(repo);
      expect(create).not.toThrowError();
    });
  });

  describe('Behavior', () => {
    it('should save goal to repo', () => {
      const goal = new Goal(new VolumeInMl(32), {
        am: new TimeInMins(180),
        pm: new TimeInMins(240),
      });

      const repo = new FakeGoalRepository();
      const action = new SaveGoalAction(repo);
      return action.execute(goal).then(() => {
        expect(repo.fakeValue?.is(goal)).toBe(true);
      });
    });
  });
});

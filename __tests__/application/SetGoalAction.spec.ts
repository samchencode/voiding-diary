import { SetGoalAction } from '@/application/SetGoalAction';
import { Goal } from '@/domain/models/Goal';
import { TimeInMins } from '@/domain/models/TimeInMins';
import { VolumeInOz } from '@/domain/models/Volume';
import { FakeGoalRepository } from '@/infrastructure/persistence/fake/FakeGoalRepository';

describe('SaveGoalAction', () => {
  describe('Instantiation', () => {
    it('should create new action given repo', () => {
      const repo = new FakeGoalRepository();
      const create = () => new SetGoalAction(repo);
      expect(create).not.toThrowError();
    });
  });

  describe('Behavior', () => {
    it('should save goal to repo', () => {
      const goal = new Goal(new VolumeInOz(32), {
        am: new TimeInMins(180),
        pm: new TimeInMins(240),
      });

      const repo = new FakeGoalRepository();
      const action = new SetGoalAction(repo);
      return action.execute(goal).then(() => {
        expect(repo.fakeValue?.is(goal)).toBe(true);
      });
    });
  });
});

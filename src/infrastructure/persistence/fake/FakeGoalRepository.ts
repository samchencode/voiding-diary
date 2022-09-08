import type { Goal } from '@/domain/models/Goal';
import type { GoalRepository } from '@/domain/ports/GoalRepository';
import { GoalNotFoundError } from '@/infrastructure/persistence/fake/GoalNotFoundError';

class FakeGoalRepository implements GoalRepository {
  fakeValue?: Goal;

  async get(): Promise<Goal> {
    if (!this.fakeValue) throw new GoalNotFoundError();
    return this.fakeValue;
  }

  async save(goal: Goal): Promise<void> {
    this.fakeValue = goal;
  }
}

export { FakeGoalRepository };

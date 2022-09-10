import type { Goal } from '@/domain/models/Goal';
import type { GoalRepository } from '@/domain/ports/GoalRepository';

class SetGoalAction {
  repo: GoalRepository;

  constructor(goalRepository: GoalRepository) {
    this.repo = goalRepository;
  }

  async execute(goal: Goal) {
    await this.repo.save(goal);
  }
}

export { SetGoalAction };

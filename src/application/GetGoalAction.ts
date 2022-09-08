import type { GoalRepository } from '@/domain/ports/GoalRepository';

class GetGoalAction {
  private repo: GoalRepository;

  constructor(goalRepository: GoalRepository) {
    this.repo = goalRepository;
  }

  async execute() {
    return this.repo.get();
  }
}

export { GetGoalAction };

import type { Goal } from '@/domain/models/Goal';

interface GoalRepository {
  save(goal: Goal): Promise<void>;
}

export type { GoalRepository };

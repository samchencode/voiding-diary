import type { Goal } from '@/domain/models/Goal';

interface GoalRepository {
  get(): Promise<Goal>;
  save(goal: Goal): Promise<void>;
}

export type { GoalRepository };

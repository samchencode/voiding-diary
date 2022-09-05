import type { Goal } from '@/domain/models/Goal';

interface GoalRepository {
  save(goal: Goal): void;
}

export type { GoalRepository };

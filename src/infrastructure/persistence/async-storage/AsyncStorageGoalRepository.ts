import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Goal, SerializedGoal } from '@/domain/models/Goal';
import type { GoalRepository } from '@/domain/ports/GoalRepository';
import { GoalNotFoundError } from '@/domain/ports/GoalRepository';
import { hydrateGoal } from '@/domain/services/hydrateGoal';

const STORAGE_KEY = '@goal';

class AsyncStorageGoalRepository implements GoalRepository {
  // eslint-disable-next-line class-methods-use-this
  async get(): Promise<Goal> {
    const result = await AsyncStorage.getItem(STORAGE_KEY);
    if (result === null) throw new GoalNotFoundError();
    const serialized = JSON.parse(result) as SerializedGoal;
    return hydrateGoal(serialized);
  }

  // eslint-disable-next-line class-methods-use-this
  async save(goal: Goal): Promise<void> {
    const serialized = goal.serialize();
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
  }

  // eslint-disable-next-line class-methods-use-this
  async reset(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEY);
  }
}

export { AsyncStorageGoalRepository };

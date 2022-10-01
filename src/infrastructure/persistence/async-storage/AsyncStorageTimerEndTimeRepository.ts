/* eslint-disable class-methods-use-this */
import type { TimerEndTimeRepository } from '@/application/ports/TimerEndTimeRepository';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@timer-ends-at';

class AsyncStorageTimerEndTimeRepository implements TimerEndTimeRepository {
  async setEndTime(date: Date): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEY, date.getTime().toString());
  }

  async getEndTime(): Promise<Date | null> {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    if (saved === null) return null;
    const ms = Number.parseInt(saved, 10);
    return new Date(ms);
  }

  async deleteEndTime(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEY);
  }
}

export { AsyncStorageTimerEndTimeRepository };

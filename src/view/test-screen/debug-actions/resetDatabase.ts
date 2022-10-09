import type { AsyncStorageGoalRepository } from '@/infrastructure/persistence/async-storage/AsyncStorageGoalRepository';
import type { WebSQLDatabase } from 'expo-sqlite';

export function resetDatabase(
  expoSqliteDatabase: WebSQLDatabase,
  asyncStorageGoalRepository: AsyncStorageGoalRepository
) {
  // @ts-expect-error for debug only
  expoSqliteDatabase.deleteDb();
  asyncStorageGoalRepository.reset();
}

import type { Record } from '@/domain/models/Record';
import type { RecordRepository } from '@/domain/ports/RecordRepository';
import { BaseExpoSqliteRecordRepository } from '@/infrastructure/persistence/expo-sqlite/ExpoSqliteRecordRepository/BaseExpoSqliteRecordRepository';
import type { WebSQLDatabase } from 'expo-sqlite';

class ExpoSqliteRecordRepositoryReadyProxy implements RecordRepository {
  repo: BaseExpoSqliteRecordRepository;

  ready: Promise<void>;

  constructor(expoSqliteDatabase: WebSQLDatabase) {
    this.repo = new BaseExpoSqliteRecordRepository(expoSqliteDatabase);
    this.ready = new Promise<void>((s, f) => {
      this.repo
        .createTable()
        .then(() => s())
        .catch((err) => f(err));
    });
  }

  async getAll(): Promise<Record[]> {
    await this.ready;
    return this.repo.getAll();
  }

  async getByDateInterval(startDate: Date, endDate: Date): Promise<Record[]> {
    await this.ready;
    return this.repo.getByDateInterval(startDate, endDate);
  }

  async getByLimitAndOffset(limit: number, offset: number): Promise<Record[]> {
    await this.ready;
    return this.repo.getByLimitAndOffset(limit, offset);
  }

  async save(record: Record): Promise<void> {
    await this.ready;
    return this.repo.save(record);
  }
}

export { ExpoSqliteRecordRepositoryReadyProxy };
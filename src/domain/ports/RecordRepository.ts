import type { Record } from '@/domain/models/Record';

interface RecordRepository {
  getAll(): Promise<Record[]>;
  getByDateInterval(startDate: Date, endDate: Date): Promise<Record[]>;
  getByLimitAndOffset(limit: number, offset: number): Promise<Record[]>;
  save(record: Record): Promise<void>;
}

export type { RecordRepository };

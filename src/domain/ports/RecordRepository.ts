import type { Record, RecordId } from '@/domain/models/Record';

interface RecordRepository {
  getById(id: RecordId): Promise<Record>;
  getAll(): Promise<Record[]>;
  getByDateInterval(startDate: Date, endDate: Date): Promise<Record[]>;
  getByLimitAndOffset(limit: number, offset: number): Promise<Record[]>;
  update(id: RecordId, record: Record): Promise<void>;
  save(record: Record): Promise<void>;
  delete(id: RecordId): Promise<void>;
}

export type { RecordRepository };

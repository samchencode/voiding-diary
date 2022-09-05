import type { Record } from '@/domain/models/Record';

interface RecordRepository {
  save(record: Record): void;
}

export type { RecordRepository };

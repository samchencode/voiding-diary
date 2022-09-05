import type { Record } from '@/domain/models/Record';

interface RecordRepository {
  save(record: Record): Promise<void>;
}

export type { RecordRepository };

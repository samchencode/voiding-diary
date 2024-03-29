import type { IntakeRecord } from '@/domain/models/Record/IntakeRecord';
import type { VoidRecord } from '@/domain/models/Record/VoidRecord';

type RecordType = typeof IntakeRecord.type | typeof VoidRecord.type;

interface RowSerializedRecord {
  type: RecordType;
  volumeOz: number;
  timestamp: number;
  id: string;
}

export type { RowSerializedRecord, RecordType };

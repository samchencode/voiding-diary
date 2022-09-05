import type { IntakeRecord } from '@/domain/models/Record/IntakeRecord';
import type { VoidRecord } from '@/domain/models/Record/VoidRecord';

interface RowSerializedRecord {
  type: typeof IntakeRecord.type | typeof VoidRecord.type;
  volumeMl: number;
  timestamp: number;
}

export type { RowSerializedRecord };

import type { IntakeRecord } from '@/domain/models/Record/IntakeRecord';
import type { VoidRecord } from '@/domain/models/Record/VoidRecord';

interface RecordVisitor {
  visitIntakeRecord(r: IntakeRecord): void;
  visitVoidRecord(r: VoidRecord): void;
}

export { RecordVisitor };

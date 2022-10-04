import type { Record } from '@/domain/models/Record';
import { Report } from '@/domain/models/Report';

function makeReport(records: Record[]) {
  return new Report(records);
}

export { makeReport };

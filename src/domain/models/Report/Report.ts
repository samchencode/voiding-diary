import type { Record } from '@/domain/models/Record';

class Report {
  records: Record[];

  constructor(records: Record[]) {
    this.records = records;
  }

  getRecords() {
    return this.records;
  }
}

export { Report };

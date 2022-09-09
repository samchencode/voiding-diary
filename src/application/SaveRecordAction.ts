import type { RecordRepository } from '@/domain/ports/RecordRepository';
import type { Record } from '@/domain/models/Record';

class SaveRecordAction {
  private repo: RecordRepository;

  constructor(recordRepository: RecordRepository) {
    this.repo = recordRepository;
  }

  async execute(record: Record) {
    await this.repo.save(record);
  }
}

export { SaveRecordAction };

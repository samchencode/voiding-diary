import type { RecordRepository } from '@/domain/ports/RecordRepository';
import type { Record, RecordId } from '@/domain/models/Record';

class UpdateRecordAction {
  private repo: RecordRepository;

  constructor(recordRepository: RecordRepository) {
    this.repo = recordRepository;
  }

  async execute(id: RecordId, record: Record) {
    await this.repo.update(id, record);
  }
}

export { UpdateRecordAction };

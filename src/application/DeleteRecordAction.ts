import type { RecordRepository } from '@/domain/ports/RecordRepository';
import type { RecordId } from '@/domain/models/Record';

class DeleteRecordAction {
  private repo: RecordRepository;

  constructor(recordRepository: RecordRepository) {
    this.repo = recordRepository;
  }

  async execute(id: RecordId) {
    await this.repo.delete(id);
  }
}

export { DeleteRecordAction };

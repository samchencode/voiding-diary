import type { RecordRepository } from '@/domain/ports/RecordRepository';
import type { Record, RecordId } from '@/domain/models/Record';

class GetRecordByIdAction {
  private repo: RecordRepository;

  constructor(recordRepository: RecordRepository) {
    this.repo = recordRepository;
  }

  async execute(id: RecordId): Promise<Record> {
    return this.repo.getById(id);
  }
}

export { GetRecordByIdAction };

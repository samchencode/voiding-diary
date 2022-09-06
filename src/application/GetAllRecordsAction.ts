import type { Record } from '@/domain/models/Record';
import type { RecordRepository } from '@/domain/ports/RecordRepository';

class GetAllRecordsAction {
  repo: RecordRepository;

  constructor(recordRepository: RecordRepository) {
    this.repo = recordRepository;
  }

  async execute(): Promise<Record[]> {
    return this.repo.getAll();
  }
}

export { GetAllRecordsAction };

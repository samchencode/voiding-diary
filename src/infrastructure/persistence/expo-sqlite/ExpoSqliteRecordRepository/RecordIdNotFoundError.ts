import type { RecordId } from '@/domain/models/Record';

class RecordIdNotFoundError extends Error {
  name = 'RecordIdNotFoundError';

  constructor(id: RecordId) {
    super();
    this.message = `Record with id "${id}" not found!`;
  }
}

export { RecordIdNotFoundError };

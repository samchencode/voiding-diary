import { RecordId } from '@/domain/models/Record/RecordId';

class NullRecordId extends RecordId {
  static id = 'NULL';

  constructor() {
    super(NullRecordId.id);
  }

  // eslint-disable-next-line class-methods-use-this
  is() {
    return false;
  }
}

export { NullRecordId };

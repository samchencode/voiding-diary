import type { DateAndTime } from '@/domain/models/DateAndTime';
import type { RecordId } from '@/domain/models/Record/RecordId';
import type {
  RowSerializedRecord,
  RecordType,
} from '@/domain/models/Record/RowSerializedRecord';
import type { Volume } from '@/domain/models/Volume';

class RowSerializer {
  static serialize(
    type: RecordType,
    dateAndTime: DateAndTime,
    volume: Volume,
    id: RecordId
  ): RowSerializedRecord {
    return {
      type,
      volumeOz: Number(volume),
      timestamp: dateAndTime.getTimeInMilliseconds(),
      id: id.getValue(),
    };
  }
}

export { RowSerializer };

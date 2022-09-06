import type { DateAndTime } from '@/domain/models/DateAndTime';
import type {
  RowSerializedRecord,
  RecordType,
} from '@/domain/models/Record/RowSerializedRecord';
import type { Volume } from '@/domain/models/Volume';

class RowSerializer {
  static serialize(
    type: RecordType,
    dateAndTime: DateAndTime,
    volume: Volume
  ): RowSerializedRecord {
    return {
      type,
      volumeMl: Number(volume),
      timestamp: dateAndTime.getTimeInMilliseconds(),
    };
  }
}

export { RowSerializer };

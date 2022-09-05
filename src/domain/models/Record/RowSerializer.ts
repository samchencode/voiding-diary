import type { DateAndTime } from '@/domain/models/DateAndTime';
import type { RowSerializedRecord } from '@/domain/models/Record/RowSerializedRecord';
import type { Volume } from '@/domain/models/Volume';

type Type = RowSerializedRecord['type'];

class RowSerializer {
  static serialize(
    type: Type,
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

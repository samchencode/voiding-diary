import { DateAndTime } from '@/domain/models/DateAndTime';
import type { RecordType, RowSerializedRecord } from '@/domain/models/Record';
import { fromRecordType } from '@/domain/models/Record';
import { fromNumericValue } from '@/domain/models/Volume';

const hydrateRowSerializedRecord = (r: RowSerializedRecord) => {
  const dateAndTime = new DateAndTime(new Date(r.timestamp));
  const volume = fromNumericValue(r.volumeOz);
  return fromRecordType(r.type as RecordType, dateAndTime, volume);
};

export { hydrateRowSerializedRecord };

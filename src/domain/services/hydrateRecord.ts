import { DateAndTime } from '@/domain/models/DateAndTime';
import type {
  RecordType,
  RowSerializedRecord,
  Record,
} from '@/domain/models/Record';
import { fromRecordType, RecordId } from '@/domain/models/Record';
import { NullRecordId } from '@/domain/models/Record/NullRecordId';
import { fromNumericValue } from '@/domain/models/Volume';

const hydrateRowSerializedRecord = (r: RowSerializedRecord): Record => {
  const dateAndTime = new DateAndTime(new Date(r.timestamp));
  const volume = fromNumericValue(r.volumeOz);
  const id = r.id === NullRecordId.id ? new NullRecordId() : new RecordId(r.id);
  return fromRecordType(r.type as RecordType, dateAndTime, volume, id);
};

export { hydrateRowSerializedRecord };

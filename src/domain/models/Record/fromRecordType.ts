import type { DateAndTime } from '@/domain/models/DateAndTime';
import { IntakeRecord } from '@/domain/models/Record/IntakeRecord';
import { UnknownRecordTypeError } from '@/domain/models/Record/UnknownRecordTypeError';
import { VoidRecord } from '@/domain/models/Record/VoidRecord';
import type { Volume } from '@/domain/models/Volume';

type Type = typeof IntakeRecord.type | typeof VoidRecord.type;

function fromRecordType(type: Type, dateAndTime: DateAndTime, volume: Volume) {
  if (type === IntakeRecord.type) {
    return new IntakeRecord(dateAndTime, volume);
  }
  if (type === VoidRecord.type) {
    return new VoidRecord(dateAndTime, volume);
  }
  throw new UnknownRecordTypeError(type);
}

export { fromRecordType };

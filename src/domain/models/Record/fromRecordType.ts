import type { DateAndTime } from '@/domain/models/DateAndTime';
import { IntakeRecord } from '@/domain/models/Record/IntakeRecord';
import type { RecordId } from '@/domain/models/Record/RecordId';
import { UnknownRecordTypeError } from '@/domain/models/Record/UnknownRecordTypeError';
import { VoidRecord } from '@/domain/models/Record/VoidRecord';
import type { Volume } from '@/domain/models/Volume';
import { VolumeInOz } from '@/domain/models/Volume';

type Type = typeof IntakeRecord.type | typeof VoidRecord.type;

function fromRecordType(
  type: Type,
  dateAndTime: DateAndTime,
  volume: Volume,
  id?: RecordId
) {
  if (type === IntakeRecord.type) {
    if (!(volume instanceof VolumeInOz))
      throw Error('unknown volume in intake record');
    return new IntakeRecord(dateAndTime, volume, id);
  }
  if (type === VoidRecord.type) {
    return new VoidRecord(dateAndTime, volume, id);
  }
  throw new UnknownRecordTypeError(type);
}

export { fromRecordType };

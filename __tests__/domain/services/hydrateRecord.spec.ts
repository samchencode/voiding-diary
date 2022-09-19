import { DateAndTime } from '@/domain/models/DateAndTime';
import type { RowSerializedRecord } from '@/domain/models/Record';
import { IntakeRecord, VoidRecord } from '@/domain/models/Record';
import { NullRecordId } from '@/domain/models/Record/NullRecordId';
import { RecordId } from '@/domain/models/Record/RecordId';
import { VolumeInOz } from '@/domain/models/Volume';
import { hydrateRowSerializedRecord } from '@/domain/services/hydrateRecord';

describe('hydrateRecord', () => {
  it('should convert serialized intake record to record entity', () => {
    const serialized: RowSerializedRecord = {
      id: '1',
      type: IntakeRecord.type,
      volumeOz: 8,
      timestamp: 0,
    };
    const expected = new IntakeRecord(
      new DateAndTime(new Date(0)),
      new VolumeInOz(8),
      new RecordId('1')
    );

    const result = hydrateRowSerializedRecord(serialized);
    expect(result).toBeInstanceOf(IntakeRecord);
    expect((result as IntakeRecord).is(expected)).toBe(true);
  });

  it('should convert serialized void record into record entity', () => {
    const serialized: RowSerializedRecord = {
      id: '2',
      type: VoidRecord.type,
      volumeOz: 8,
      timestamp: 0,
    };
    const expected = new VoidRecord(
      new DateAndTime(new Date(0)),
      new VolumeInOz(8),
      new RecordId('2')
    );

    const result = hydrateRowSerializedRecord(serialized);
    expect(result).toBeInstanceOf(VoidRecord);
    expect((result as VoidRecord).is(expected)).toBe(true);
  });

  it('should convert id of NULL to NullRecordId', () => {
    const serialized: RowSerializedRecord = {
      id: 'NULL',
      type: VoidRecord.type,
      volumeOz: 8,
      timestamp: 0,
    };
    const record = hydrateRowSerializedRecord(serialized);
    const id = record.getId();

    expect(id).toBeInstanceOf(NullRecordId);
  });

  it('should convert volume of -1 to UnknownVolume', () => {
    const serialized: RowSerializedRecord = {
      id: '1',
      type: VoidRecord.type,
      volumeOz: -1,
      timestamp: 0,
    };
    const record = hydrateRowSerializedRecord(serialized) as VoidRecord;
    const volume = record.getUrineVolumeString();
    expect(volume).toBe('');
  });
});

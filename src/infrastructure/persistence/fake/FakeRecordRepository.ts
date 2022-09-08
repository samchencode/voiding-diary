import type { Record } from '@/domain/models/Record';
import type { RecordRepository } from '@/domain/ports/RecordRepository';
import { hydrateRowSerializedRecord } from '@/domain/services/hydrateRecord';
import { mockData } from '@/infrastructure/persistence/fake/mockData';

class FakeRecordRepository implements RecordRepository {
  mockData = mockData.slice();

  async getAll(): Promise<Record[]> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.mockData.map(hydrateRowSerializedRecord);
  }

  async getByDateInterval(startDate: Date, endDate: Date): Promise<Record[]> {
    return (
      this.mockData
        .filter(
          (v) =>
            v.timestamp >= startDate.getTime() &&
            v.timestamp <= endDate.getTime()
        )
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .map(hydrateRowSerializedRecord)
    );
  }

  async getByLimitAndOffset(limit: number, offset: number): Promise<Record[]> {
    return (
      this.mockData
        .slice(offset, offset + limit)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .map(hydrateRowSerializedRecord)
    );
  }

  async save(record: Record): Promise<void> {
    this.mockData.unshift(record.serialize());
  }
}

export { FakeRecordRepository };

import { DateAndTime } from '@/domain/models/DateAndTime';
import type { Record, RecordType } from '@/domain/models/Record';
import { fromRecordType } from '@/domain/models/Record';
import { fromNumericValue } from '@/domain/models/Volume';
import type { RecordRepository } from '@/domain/ports/RecordRepository';
import { mockData } from '@/infrastructure/persistence/fake/mockData';

const mockDataToObject = (v: typeof mockData[0]) => {
  const dateAndTime = new DateAndTime(new Date(v.timestamp));
  const volume = fromNumericValue(v.volumeMl);
  return fromRecordType(v.type as RecordType, dateAndTime, volume);
};

class FakeRecordRepository implements RecordRepository {
  // eslint-disable-next-line class-methods-use-this
  async getAll(): Promise<Record[]> {
    return mockData.map(mockDataToObject);
  }

  // eslint-disable-next-line class-methods-use-this
  async getByDateInterval(startDate: Date, endDate: Date): Promise<Record[]> {
    return mockData
      .filter(
        (v) =>
          v.timestamp >= startDate.getTime() && v.timestamp <= endDate.getTime()
      )
      .map(mockDataToObject);
  }

  // eslint-disable-next-line class-methods-use-this
  async getByLimitAndOffset(limit: number, offset: number): Promise<Record[]> {
    return mockData.slice(offset, offset + limit).map(mockDataToObject);
  }

  // eslint-disable-next-line class-methods-use-this
  save(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export { FakeRecordRepository };

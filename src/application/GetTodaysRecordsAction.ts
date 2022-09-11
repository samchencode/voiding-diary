import type { RecordRepository } from '@/domain/ports/RecordRepository';

const setToMidnightYesterday = (d: Date) => {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  return date;
};

const setToMidnightToday = (d: Date) => {
  const date = setToMidnightYesterday(d);
  date.setDate(d.getDate() + 1);
  return date;
};

class GetTodaysRecordsAction {
  repo: RecordRepository;

  constructor(recordRepository: RecordRepository) {
    this.repo = recordRepository;
  }

  async execute() {
    const today = setToMidnightYesterday(new Date());
    const tomorrow = setToMidnightToday(new Date());
    return this.repo.getByDateInterval(today, tomorrow);
  }
}

export { GetTodaysRecordsAction };

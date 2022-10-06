import type { TimerEndTimeRepository } from '@/application/ports/TimerEndTimeRepository';

class FakeTimerEndTimeRepository implements TimerEndTimeRepository {
  endTime: Date | null = null;

  async setEndTime(date: Date): Promise<void> {
    this.endTime = date;
  }

  async getEndTime(): Promise<Date | null> {
    return this.endTime;
  }

  async deleteEndTime(): Promise<void> {
    this.endTime = null;
  }
}

export { FakeTimerEndTimeRepository };

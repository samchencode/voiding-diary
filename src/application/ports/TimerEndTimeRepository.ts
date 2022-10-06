interface TimerEndTimeRepository {
  setEndTime(date: Date): Promise<void>;
  getEndTime(): Promise<Date | null>;
  deleteEndTime(): Promise<void>;
}

export type { TimerEndTimeRepository };

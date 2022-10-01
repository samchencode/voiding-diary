interface NotificationScheduler {
  schedule(notifyAt: Date): Promise<string>;
  cancel(identifier: string): Promise<void>;
  dismiss(identifier: string): Promise<void>;
  setOnInteractionListener(fn: () => void): void;
}

export type { NotificationScheduler };

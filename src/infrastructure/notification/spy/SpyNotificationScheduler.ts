/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import type { NotificationScheduler } from '@/application/ports/NotificationScheduler';

class SpyNotifcationScheduler implements NotificationScheduler {
  constructor(spies: Partial<NotificationScheduler>) {
    Object.assign(this, spies);
  }

  onInteraction = () => {};

  setOnInteractionListener(fn: () => void): void {
    this.onInteraction = fn;
  }

  simulateInteraction() {
    this.onInteraction();
  }

  schedule(_notifyAt: Date): Promise<string> {
    throw new Error('Method not implemented.');
  }

  cancel(_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  dismiss(_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export { SpyNotifcationScheduler };

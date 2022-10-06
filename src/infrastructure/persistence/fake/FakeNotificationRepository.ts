import type { NotificationRepository } from '@/application/ports/NotificationRepository';
import type { Notification } from '@/application/services/timer/SendsNotifications';

class FakeNotificationRepository implements NotificationRepository {
  notification: Notification | null = null;

  async setNotification(n: Notification): Promise<void> {
    this.notification = n;
  }

  async getNotificationOrNull(): Promise<Notification | null> {
    return this.notification;
  }

  async deleteNotification(): Promise<void> {
    this.notification = null;
  }
}

export { FakeNotificationRepository };

import type { Notification } from '@/application/services/timer/SendsNotifications/Notification';

interface NotificationRepository {
  setNotification(n: Notification): Promise<void>;
  getNotificationOrNull(): Promise<Notification | null>;
  deleteNotification(): Promise<void>;
}

export type { NotificationRepository };

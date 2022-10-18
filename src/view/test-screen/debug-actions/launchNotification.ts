import type { NotificationScheduler } from '@/application/ports/NotificationScheduler';

export async function launchNotification(
  notificationScheduler: NotificationScheduler
) {
  try {
    await notificationScheduler.schedule(new Date(Date.now() + 1500));
  } catch (e) {
    console.error(e);
  }
}

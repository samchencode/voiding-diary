/* eslint-disable class-methods-use-this */
import type { NotificationScheduler } from '@/application/ports/NotificationScheduler';
import * as ExpoNotifications from 'expo-notifications';

const NOTIFICATION_CATEGORY_IDENTIFIER = 'void_reminder';
const NOTIFICATION_ACTION_IDENTIFIER = 'void_action';
const NOTIFICATION_BUTTON_TITLE = 'Record Void';
const NOTIFICATION_TITLE = 'Void Interval Reached';
const NOTIFICATION_BODY = 'Time to save a new void record.';

function toMsFromNow(d: Date) {
  const now = new Date();
  return d.getTime() - now.getTime();
}

class ExpoNotificationsNotificationScheduler implements NotificationScheduler {
  private ready: Promise<unknown>;

  constructor() {
    ExpoNotifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    ExpoNotifications.setNotificationCategoryAsync(
      NOTIFICATION_CATEGORY_IDENTIFIER,
      [
        {
          identifier: NOTIFICATION_ACTION_IDENTIFIER,
          buttonTitle: NOTIFICATION_BUTTON_TITLE,
          options: {
            opensAppToForeground: true,
          },
        },
      ]
    );

    ExpoNotifications.setNotificationCategoryAsync(
      NOTIFICATION_CATEGORY_IDENTIFIER,
      [
        {
          identifier: NOTIFICATION_ACTION_IDENTIFIER,
          buttonTitle: NOTIFICATION_BUTTON_TITLE,
          options: {
            opensAppToForeground: true,
          },
        },
      ]
    );

    this.ready = this.init();
  }

  async init() {
    const hasPermission = await this.checkPermissions();
    if (!hasPermission) await this.requestPermissions();
  }

  async checkPermissions() {
    const permission = await ExpoNotifications.getPermissionsAsync();
    return permission.granted;
  }

  async requestPermissions() {
    await ExpoNotifications.requestPermissionsAsync({
      android: {},
      ios: {
        allowAlert: true,
        allowSound: true,
        allowAnnouncements: true,
      },
    });
  }

  setOnInteractionListener(fn: () => void): void {
    ExpoNotifications.addNotificationResponseReceivedListener((response) => {
      if (response.actionIdentifier !== NOTIFICATION_ACTION_IDENTIFIER) return;
      fn();
    });
  }

  async schedule(notifyAt: Date): Promise<string> {
    await this.ready;
    const seconds = toMsFromNow(notifyAt) / 1000;

    return ExpoNotifications.scheduleNotificationAsync({
      content: {
        title: NOTIFICATION_TITLE,
        body: NOTIFICATION_BODY,
        categoryIdentifier: NOTIFICATION_CATEGORY_IDENTIFIER,
      },
      trigger: { seconds },
    });
  }

  async cancel(id: string): Promise<void> {
    await this.ready;
    await ExpoNotifications.cancelScheduledNotificationAsync(id);
  }

  async dismiss(id: string): Promise<void> {
    await this.ready;
    await ExpoNotifications.dismissNotificationAsync(id);
  }
}

export { ExpoNotificationsNotificationScheduler };

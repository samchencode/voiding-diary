import { toMsFromNow } from '@/infrastructure/timer/util';
import * as ExpoNotifications from 'expo-notifications';

const NOTIFICATION_CATEGORY_IDENTIFIER = 'void_reminder';
const NOTIFICATION_ACTION_IDENTIFIER = 'void_action';
const NOTIFICATION_BUTTON_TITLE = 'Record Void';
const NOTIFICATION_TITLE = 'Void Interval Reached';
const NOTIFICATION_BODY = 'Time to save a new void record.';

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

// TODO: Notification Interaction Listener!
// subscription = null;
// setNotificationInteractionListener(handler) {
//   this.subscription = Notifications.addNotificationResponseReceivedListener(
//     (response) => {
//       if (response.actionIdentifier === VoidNotification.ACTION_IDENTIFIER) {
//         handler(response);
//       }
//     }
//   );

//   return this.subscription;
// }

class Notifications {
  static async schedule(notifyAt: Date) {
    const seconds = toMsFromNow(notifyAt) / 1000;

    const notificationIdentifier =
      await ExpoNotifications.scheduleNotificationAsync({
        content: {
          title: NOTIFICATION_TITLE,
          body: NOTIFICATION_BODY,
          categoryIdentifier: NOTIFICATION_CATEGORY_IDENTIFIER,
        },
        trigger: { seconds },
      });
    return { notificationIdentifier, notifyAt };
  }

  static async cancel(notificationIdentifier: string) {
    await ExpoNotifications.cancelScheduledNotificationAsync(
      notificationIdentifier
    );
  }
}

export { Notifications };

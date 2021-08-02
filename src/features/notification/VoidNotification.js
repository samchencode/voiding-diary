import * as Notifications from 'expo-notifications';

class VoidNotification {
  static CATEGORY_IDENTIFIER = 'void_reminder';
  static ACTION_IDENTIFIER = 'void_action';
  static BUTTON_TITLE = 'Log Void';
  static TITLE = 'Void Interval Reached';
  static BODY = 'Time to record a new void event.';

  constructor() {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    Notifications.setNotificationCategoryAsync(
      VoidNotification.CATEGORY_IDENTIFIER,
      [
        {
          identifier: VoidNotification.ACTION_IDENTIFIER,
          buttonTitle: VoidNotification.BUTTON_TITLE,
          options: {
            opensAppToForeground: true,
          },
        },
      ]
    );
  }

  notificationIdentifier = null;

  async schedule({ seconds }) {
    this.notificationIdentifier = await Notifications.scheduleNotificationAsync(
      {
        content: {
          title: VoidNotification.TITLE,
          body: VoidNotification.BODY,
          categoryIdentifier: VoidNotification.CATEGORY_IDENTIFIER,
        },
        trigger: { seconds },
      }
    );

    return this.notificationIdentifier;
  }

  async cancel() {
    if (!this.notificationIdentifier) return;
    await Notifications.cancelScheduledNotificationAsync(
      this.notificationIdentifier
    );
  }

  subscription = null;
  setNotificationInteractionListener(handler) {
    this.subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        if (response.actionIdentifier === VoidNotification.ACTION_IDENTIFIER) {
          handler(response);
        }
      }
    );

    return this.subscription;
  }

  async dismiss() {
    if (!this.notificationIdentifier) return;
    await Notifications.dismissNotificationAsync(this.notificationIdentifer);
    this.notificationIdentifier = null;
  }

  async dismissAll() {
    await Notifications.dismissAllNotificationsAsync();
    this.notificationIdentifier = null;
  }

  removeNotificationInteractionListener() {
    if (!this.subscription) return;
    this.subscription.remove();
  }

  destroy() {
    this.cancel();
    this.removeNotificationInteractionListener();
  }
}

export default VoidNotification;

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@timer_notification_identifier';

type SerializedNotification = {
  notificationIdentifier: string;
  notifyAt: Date;
};

class NotificationStorage {
  static async save(notificationIdentifier: string, notifyAt: Date) {
    const data = {
      notifyAtMs: notifyAt.getTime(),
      notificationIdentifier,
    };
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  static async getValueOrNull(): Promise<SerializedNotification | null> {
    const result = await AsyncStorage.getItem(STORAGE_KEY);
    if (result === null) return null;
    const { notifyAtMs, notificationIdentifier } = JSON.parse(result);
    return { notifyAt: new Date(notifyAtMs), notificationIdentifier };
  }

  static async reset() {
    AsyncStorage.removeItem(STORAGE_KEY);
  }
}

export { NotificationStorage, SerializedNotification };

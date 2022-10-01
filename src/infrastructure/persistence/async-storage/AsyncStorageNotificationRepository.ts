/* eslint-disable class-methods-use-this */
import type { NotificationRepository } from '@/application/ports/NotificationRepository';
import { Notification } from '@/application/services/timer/SendsNotifications';
import type { SerializedNotification } from '@/application/services/timer/SendsNotifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@timer_notification';

class AsyncStorageNotificationRepository implements NotificationRepository {
  async setNotification(n: Notification): Promise<void> {
    const serialized = n.serialize();
    const json = JSON.stringify(serialized);
    await AsyncStorage.setItem(STORAGE_KEY, json);
  }

  async getNotificationOrNull(): Promise<Notification | null> {
    const result = await AsyncStorage.getItem(STORAGE_KEY);
    if (result === null) return null;
    const { notifyAt, id } = JSON.parse(result) as SerializedNotification;
    return new Notification(id, new Date(notifyAt));
  }

  async deleteNotification(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEY);
  }
}

export { AsyncStorageNotificationRepository };

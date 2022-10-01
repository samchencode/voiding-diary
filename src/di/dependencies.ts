import { factory as App } from '@/view/app';
import { factory as Router } from '@/view/router';
import { factory as HomeScreen } from '@/view/home-screen';
import { factory as GoalScreen } from '@/view/goal-screen';
import { factory as RecordScreen } from '@/view/record-screen';
import { GetAllRecordsAction } from '@/application/GetAllRecordsAction';
import { GetGoalAction } from '@/application/GetGoalAction';
import { expoSqliteDatabaseFactory } from '@/infrastructure/persistence/expo-sqlite/expoSqliteDatabaseFactory';
import { SaveRecordAction } from '@/application/SaveRecordAction';
import { GetTodaysRecordsAction } from '@/application/GetTodaysRecordsAction';
import { ExpoSqliteRecordRepository } from '@/infrastructure/persistence/expo-sqlite/ExpoSqliteRecordRepository';
import { SetGoalAction } from '@/application/SetGoalAction';
import { AsyncStorageGoalRepository } from '@/infrastructure/persistence/async-storage/AsyncStorageGoalRepository';
import { GetTimerAction } from '@/application/GetTimerAction';
import { AsyncStorageTimerEndTimeRepository } from '@/infrastructure/persistence/async-storage/AsyncStorageTimerEndTimeRepository';
import { AsyncStorageNotificationRepository } from '@/infrastructure/persistence/async-storage/AsyncStorageNotificationRepository';
import { ExpoNotificationsNotificationScheduler } from '@/infrastructure/notification/expo-notifications/ExpoNotificationsNotificationScheduler';

export const module = {
  // APPLICATION SERVICES
  getAllRecordsAction: ['type', GetAllRecordsAction],
  getTodaysRecordsAction: ['type', GetTodaysRecordsAction],
  saveRecordAction: ['type', SaveRecordAction],
  getGoalAction: ['type', GetGoalAction],
  setGoalAction: ['type', SetGoalAction],
  getTimerAction: ['type', GetTimerAction],

  // INFRASTRUCTURE
  recordRepository: ['type', ExpoSqliteRecordRepository],
  goalRepository: ['type', AsyncStorageGoalRepository],
  timerEndTimeRepository: ['type', AsyncStorageTimerEndTimeRepository],
  notificationRepository: ['type', AsyncStorageNotificationRepository],
  notificationScheduler: ['type', ExpoNotificationsNotificationScheduler],

  expoSqliteDatabase: ['factory', expoSqliteDatabaseFactory],

  // VALUES
  foo: ['value', 'foo'],

  // TEMPLATES
  App: ['factory', App],
  Router: ['factory', Router],
  HomeScreen: ['factory', HomeScreen],
  GoalScreen: ['factory', GoalScreen],
  RecordScreen: ['factory', RecordScreen],

  // DEBUG
  asyncStorageGoalRepository: [
    'factory',
    (goalRepository: AsyncStorageGoalRepository) => goalRepository,
  ],
};

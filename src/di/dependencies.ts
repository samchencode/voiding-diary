import { factory as App } from '@/view/app';
import { factory as Router } from '@/view/router';
import { factory as HomeScreen } from '@/view/home-screen';
import { factory as GoalScreen } from '@/view/goal-screen';
import { factory as RecordScreen } from '@/view/record-screen';
import { factory as TestScreen } from '@/view/test-screen';
import { factory as NoGoalModal } from '@/view/no-goal-modal';
import { factory as EditIntakeRecordModal } from '@/view/edit-intake-record-modal';
import { factory as EditVoidRecordModal } from '@/view/edit-void-record-modal';
import { factory as RecordIntakeModal } from '@/view/record-intake-modal';
import { GetAllRecordsAction } from '@/application/GetAllRecordsAction';
import { GetGoalAction } from '@/application/GetGoalAction';
import { expoSqliteDatabaseFactory } from '@/infrastructure/persistence/expo-sqlite/expoSqliteDatabaseFactory';
import { SaveRecordAction } from '@/application/SaveRecordAction';
import { GetTodaysRecordsAction } from '@/application/GetTodaysRecordsAction';
import { ExpoSqliteRecordRepository } from '@/infrastructure/persistence/expo-sqlite/ExpoSqliteRecordRepository';
import { SetGoalAction } from '@/application/SetGoalAction';
import { AsyncStorageGoalRepository } from '@/infrastructure/persistence/async-storage/AsyncStorageGoalRepository';
import { UpdateRecordAction } from '@/application/UpdateRecordAction';
import { GetTimerAction } from '@/application/GetTimerAction';
import { AsyncStorageTimerEndTimeRepository } from '@/infrastructure/persistence/async-storage/AsyncStorageTimerEndTimeRepository';
import { AsyncStorageNotificationRepository } from '@/infrastructure/persistence/async-storage/AsyncStorageNotificationRepository';
import { ExpoNotificationsNotificationScheduler } from '@/infrastructure/notification/expo-notifications/ExpoNotificationsNotificationScheduler';
import { ExpoAvAudioPlayer } from '@/infrastructure/audio/expo-av/ExpoAvAudioPlayer';
import { ReactNativeVibrator } from '@/infrastructure/vibration/react-native/ReactNativeVibrator';
import { EjsReportFormatter } from '@/infrastructure/report-formatter/ejs/EjsReportFormatter';
import { ExpoAssetFileSystem } from '@/infrastructure/file-system/expo-asset/ExpoAssetFileSystem';
import { ExpoSharingPdfExporter } from '@/infrastructure/export/expo-sharing/ExpoSharingPdfExporter';
import { ExpoSharingTextFileExporter } from '@/infrastructure/export/expo-sharing/ExpoSharingTextFileExporter';
import { ExportReportAsPdfAction } from '@/application/ExportReportAsPdfAction';
import { ExportReportOfAllRecordsAsPdfAction } from '@/application/ExportReportOfAllRecordsAsPdfAction';
import { getEnvVars } from '@/env';
import {
  makeGoalStaleObservable,
  makeRecordsStaleObservable,
} from '@/view/observables';

export const module = {
  // APPLICATION SERVICES
  getAllRecordsAction: ['type', GetAllRecordsAction],
  getTodaysRecordsAction: ['type', GetTodaysRecordsAction],
  saveRecordAction: ['type', SaveRecordAction],
  updateRecordAction: ['type', UpdateRecordAction],
  getGoalAction: ['type', GetGoalAction],
  setGoalAction: ['type', SetGoalAction],
  getTimerAction: ['type', GetTimerAction],
  exportReportAsPdfAction: ['type', ExportReportAsPdfAction],
  exportReportOfAllRecordsAsPdfAction: [
    'type',
    ExportReportOfAllRecordsAsPdfAction,
  ],

  // INFRASTRUCTURE
  recordRepository: ['type', ExpoSqliteRecordRepository],
  goalRepository: ['type', AsyncStorageGoalRepository],
  timerEndTimeRepository: ['type', AsyncStorageTimerEndTimeRepository],
  notificationRepository: ['type', AsyncStorageNotificationRepository],
  notificationScheduler: ['type', ExpoNotificationsNotificationScheduler],
  audioPlayer: ['type', ExpoAvAudioPlayer],
  vibrator: ['type', ReactNativeVibrator],
  htmlReportFormatter: ['type', EjsReportFormatter],
  fileSystem: ['type', ExpoAssetFileSystem],
  pdfExporter: ['type', ExpoSharingPdfExporter],
  textFileExporter: ['type', ExpoSharingTextFileExporter],

  expoSqliteDatabase: ['factory', expoSqliteDatabaseFactory],

  // VALUES
  environment: ['factory', getEnvVars],

  // TEMPLATES
  App: ['factory', App],
  Router: ['factory', Router],
  HomeScreen: ['factory', HomeScreen],
  GoalScreen: ['factory', GoalScreen],
  RecordScreen: ['factory', RecordScreen],
  TestScreen: ['factory', TestScreen],
  NoGoalModal: ['factory', NoGoalModal],
  EditVoidRecordModal: ['factory', EditVoidRecordModal],
  EditIntakeRecordModal: ['factory', EditIntakeRecordModal],
  RecordIntakeModal: ['factory', RecordIntakeModal],

  // OBSERVABLES
  goalStaleObservable: ['factory', makeGoalStaleObservable],
  recordsStaleObservable: ['factory', makeRecordsStaleObservable],
};

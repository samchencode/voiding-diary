import { factory as App } from '@/view/app';
import { factory as Router } from '@/view/router';
import { factory as HomeScreen } from '@/view/home-screen';
import { factory as GoalScreen } from '@/view/goal-screen';
import { factory as RecordScreen } from '@/view/record-screen';
import { GetAllRecordsAction } from '@/application/GetAllRecordsAction';
import { GetGoalAction } from '@/application/GetGoalAction';
import { FakeGoalRepository } from '@/infrastructure/persistence/fake/FakeGoalRepository';
import { expoSqliteDatabaseFactory } from '@/infrastructure/persistence/expo-sqlite/expoSqliteDatabaseFactory';
import { SaveRecordAction } from '@/application/SaveRecordAction';
import { GetTodaysRecordsAction } from '@/application/GetTodaysRecordsAction';
import { ExpoSqliteRecordRepository } from '@/infrastructure/persistence/expo-sqlite/ExpoSqliteRecordRepository';
import { SetGoalAction } from '@/application/SetGoalAction';

export const module = {
  // APPLICATION SERVICES
  getAllRecordsAction: ['type', GetAllRecordsAction],
  getTodaysRecordsAction: ['type', GetTodaysRecordsAction],
  saveRecordAction: ['type', SaveRecordAction],
  getGoalAction: ['type', GetGoalAction],
  setGoalAction: ['type', SetGoalAction],

  // INFRASTRUCTURE
  recordRepository: ['type', ExpoSqliteRecordRepository],
  goalRepository: ['type', FakeGoalRepository],

  expoSqliteDatabase: ['factory', expoSqliteDatabaseFactory],

  // VALUES
  foo: ['value', 'foo'],

  // TEMPLATES
  App: ['factory', App],
  Router: ['factory', Router],
  HomeScreen: ['factory', HomeScreen],
  GoalScreen: ['factory', GoalScreen],
  RecordScreen: ['factory', RecordScreen],
};

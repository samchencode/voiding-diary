import { factory as App } from '@/view/app';
import { factory as Router } from '@/view/router';
import { factory as HomeScreen } from '@/view/home-screen';
import { factory as GoalScreen } from '@/view/goal-screen';
import { factory as RecordScreen } from '@/view/record-screen';
import { GetAllRecordsAction } from '@/application/GetAllRecordsAction';
import { GetGoalAction } from '@/application/GetGoalAction';
import { FakeRecordRepository } from '@/infrastructure/persistence/fake/FakeRecordRepository';
import { FakeGoalRepository } from '@/infrastructure/persistence/fake/FakeGoalRepository';
import { expoSqliteDatabaseFactory } from '@/infrastructure/persistence/expo-sqlite/expoSqliteDatabaseFactory';

export const module = {
  // APPLICATION SERVICES
  getAllRecordsAction: ['type', GetAllRecordsAction],
  getGoalAction: ['type', GetGoalAction],

  // INFRASTRUCTURE
  recordRepository: ['type', FakeRecordRepository],
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

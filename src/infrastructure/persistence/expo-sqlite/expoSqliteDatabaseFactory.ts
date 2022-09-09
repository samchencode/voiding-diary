import { openDatabase } from 'expo-sqlite';

const DATABASE_FILE = 'data-v1.db';

export const expoSqliteDatabaseFactory = () => openDatabase(DATABASE_FILE);

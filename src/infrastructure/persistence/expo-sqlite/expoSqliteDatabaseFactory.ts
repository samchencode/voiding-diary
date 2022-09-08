import { openDatabase } from 'expo-sqlite';

const DATABASE_FILE = 'data.db';

export const expoSqliteDatabaseFactory = () => openDatabase(DATABASE_FILE);

import { openDatabase } from 'expo-sqlite';

const DATABASE_FILE = 'data-v1.db';

export const expoSqliteDatabaseFactory = () => {
  const db = openDatabase(DATABASE_FILE);

  // @ts-expect-error Add a way to reset our changes for debug
  db.deleteDb = async () => {
    db.closeAsync();
    await db.deleteAsync();
    alert('Database Deleted. Now reload the app!');
  };

  return db;
};

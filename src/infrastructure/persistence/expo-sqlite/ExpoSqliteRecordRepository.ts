import type { Record, RowSerializedRecord } from '@/domain/models/Record';
import type { RecordRepository } from '@/domain/ports/RecordRepository';
import { hydrateRowSerializedRecord } from '@/infrastructure/persistence/expo-sqlite/hydrateRecord';
import type { WebSQLDatabase, SQLTransaction, SQLResultSet } from 'expo-sqlite';

class ExpoSqliteRecordRepository implements RecordRepository {
  private db: WebSQLDatabase;

  private ready: Promise<void>;

  constructor(expoSqliteDatabase: WebSQLDatabase) {
    this.db = expoSqliteDatabase;

    this.ready = new Promise((s) => {
      this.createTable().then(() => s());
    });
  }

  private async transaction() {
    await this.ready;
    return new Promise<SQLTransaction>((s, f) => {
      this.db.transaction(s, f);
    });
  }

  private async executeSql<T>(
    sqlStatement: string,
    args?: (string | number)[]
  ) {
    const tx = await this.transaction();
    return new Promise<SQLResultSet<T>>((s, f) => {
      tx.executeSql(
        sqlStatement,
        args,
        (_, res) => s(res),
        (_, err) => f(err)
      );
    });
  }

  private async executeSqlAndHydrate(
    sqlStatement: string,
    args?: (string | number)[]
  ) {
    const {
      rows: { _array: rows },
    } = await this.executeSql<RowSerializedRecord>(sqlStatement, args);
    rows.shift(); // remove title row
    return rows.map(hydrateRowSerializedRecord);
  }

  async createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS records (
      type TEXT, 
      volumeMl INTEGER,
      timestamp INTEGER,
      PRIMARY KEY(type, volumeMl, timestamp) 
    );`;

    await this.executeSql(sql);
  }

  async dropTable() {
    await this.executeSql('DROP TABLE records;');
  }

  async getAll(): Promise<Record[]> {
    return this.executeSqlAndHydrate(
      'SELECT type, volumeMl, timestamp FROM records;'
    );
  }

  async getByDateInterval(startDate: Date, endDate: Date): Promise<Record[]> {
    return this.executeSqlAndHydrate(
      `SELECT type, volumeMl, timestamp FROM records
      WHERE timestamp > ? AND timestamp < ?;`,
      [startDate.getTime(), endDate.getTime()]
    );
  }

  async getByLimitAndOffset(limit: number, offset: number): Promise<Record[]> {
    return this.executeSqlAndHydrate(
      `SELECT type, volumeMl, timestamp FROM records
      LIMIT ? OFFSET ?;`,
      [limit, offset]
    );
  }

  async save(record: Record): Promise<void> {
    const serialized = record.serialize();
    await this.executeSqlAndHydrate(
      'INSERT INTO records (type, volumeMl, timestamp) VALUES (?,?,?);',
      [serialized.type, serialized.volumeMl, serialized.timestamp]
    );
  }
}

export { ExpoSqliteRecordRepository };

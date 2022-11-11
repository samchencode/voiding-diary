import type {
  Record,
  RecordId,
  RowSerializedRecord,
} from '@/domain/models/Record';
import type { RecordRepository } from '@/domain/ports/RecordRepository';
import { hydrateRowSerializedRecord } from '@/domain/services/hydrateRecord';
import { RecordIdNotFoundError } from '@/infrastructure/persistence/expo-sqlite/ExpoSqliteRecordRepository/RecordIdNotFoundError';
import type { WebSQLDatabase, SQLTransaction, SQLResultSet } from 'expo-sqlite';

class BaseExpoSqliteRecordRepository implements RecordRepository {
  private db: WebSQLDatabase;

  constructor(expoSqliteDatabase: WebSQLDatabase) {
    this.db = expoSqliteDatabase;
  }

  private async transaction() {
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
    return rows.map(hydrateRowSerializedRecord);
  }

  async createTable() {
    await this.executeSql(
      `CREATE TABLE IF NOT EXISTS records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT, 
        volumeOz INTEGER,
        timestamp INTEGER
      );`
    );
  }

  async dropTable() {
    await this.executeSql('DROP TABLE records;');
  }

  async getById(id: RecordId): Promise<Record> {
    const results = await this.executeSqlAndHydrate(
      `SELECT type, volumeOz, timestamp, id FROM records
      WHERE id = ?`,
      [id.toString()]
    );
    return results[0];
  }

  async getAll(): Promise<Record[]> {
    return this.executeSqlAndHydrate(
      `SELECT type, volumeOz, timestamp, id FROM records
      ORDER BY timestamp DESC;`
    );
  }

  async getByDateInterval(startDate: Date, endDate: Date): Promise<Record[]> {
    return this.executeSqlAndHydrate(
      `SELECT type, volumeOz, timestamp, id FROM records
      WHERE timestamp > ? AND timestamp < ?
      ORDER BY timestamp DESC;`,
      [startDate.getTime(), endDate.getTime()]
    );
  }

  async getByLimitAndOffset(limit: number, offset: number): Promise<Record[]> {
    return this.executeSqlAndHydrate(
      `SELECT type, volumeOz, timestamp, id FROM records
      ORDER BY timestamp DESC
      LIMIT ? OFFSET ?;`,
      [limit, offset]
    );
  }

  async update(id: RecordId, record: Record): Promise<void> {
    const serialized = record.serialize();
    const res = await this.executeSql(
      `UPDATE records
      SET 
        volumeOz = ?, 
        timestamp = ?
      WHERE id = ?`,
      [serialized.volumeOz, serialized.timestamp, id.getValue()]
    );
    if (res.rowsAffected < 1) throw new RecordIdNotFoundError(id);
  }

  async save(record: Record): Promise<void> {
    const serialized = record.serialize();
    await this.executeSqlAndHydrate(
      'INSERT INTO records (type, volumeOz, timestamp) VALUES (?,?,?);',
      [serialized.type, serialized.volumeOz, serialized.timestamp]
    );
  }

  async delete(id: RecordId): Promise<void> {
    await this.executeSql('DELETE FROM records WHERE id = ?', [id.getValue()]);
  }
}

export { BaseExpoSqliteRecordRepository };

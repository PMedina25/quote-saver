import { SQLiteDatabase } from "expo-sqlite";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  let { user_version: currentDbVersion } = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version");

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    await db.execAsync(`
  PRAGMA journal_mode = 'wal';
  CREATE TABLE works (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, author TEXT NOT NULL, type TEXT NOT NULL);
  CREATE TABLE quotes (id INTEGER PRIMARY KEY NOT NULL, quote TEXT NOT NULL, author TEXT NOT NULL, workId INTEGER NOT NULL, FOREIGN KEY(workId) REFERENCES works(id) ON DELETE CASCADE);
  `);
    currentDbVersion = 1;
  }

  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

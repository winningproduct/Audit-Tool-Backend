import { createConnection, getConnectionManager } from 'typeorm';
import { dbConfig } from '../../../config/database';
import 'mysql';

export async function initMysql() {
  try {
    const con = await createConnection({
      type: 'mysql',
      host: dbConfig.host,
      port: Number(dbConfig.port),
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      entities: [],
      synchronize: true,
      logging: false,
    });
    return con;
  } catch (err) {
    if (err) {
      const existentConn = getConnectionManager().get('default');
      return existentConn;
    }
  }
}

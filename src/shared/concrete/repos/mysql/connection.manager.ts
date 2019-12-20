import { createConnection } from 'typeorm';
import { dbConfig } from '../../../config/database';
import 'mysql';

export async function initMysql() {
    console.log(dbConfig);
    const con = await createConnection({
        // tslint:disable-next-line: quotemark
        type: "mysql",
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
}

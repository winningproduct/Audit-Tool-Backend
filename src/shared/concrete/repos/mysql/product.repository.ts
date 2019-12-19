import { Product } from './../../../models/product';
import { IProductRepository } from '../../../abstract/repos/product.repository.interface';
import { injectable } from 'inversify';
import { createConnection } from 'typeorm';
import 'mysql';
import { dbConfig } from '../../../config/database';
import { handleError } from '../../../util/errorHandler';

@injectable()
export class MySQLProductRepository implements IProductRepository {
  async getProductsByUser(userId: number): Promise<Product[]> {
    let connection: any;
    let result: Product[] = [];
    try {
      connection = await createConnection({
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
      const types = await connection.query(`CALL GetProductsByUser(${userId})`);
      result = types[0].map( (product: any) => {
        return {id: product.Id , name: product.Name} as Product ;
      });
      return result;
    } catch (err) {
      handleError(err);
    } finally {
      if ( connection != null) {
        await connection.close();
      }
    }
    return result;
  }
  get(_itemId: number): Product {
    throw new Error('Method not implemented.');
  }
  add(_item: import('../../../models/product').Product) {
    throw new Error('Method not implemented.');
  }
  update(_itemId: number, _item: import('../../../models/product').Product) {
    throw new Error('Method not implemented.');
  }
  delete(_itemId: number) {
    throw new Error('Method not implemented.');
  }
}

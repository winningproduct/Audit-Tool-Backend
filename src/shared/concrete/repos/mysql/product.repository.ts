import { Product } from './../../../models/product';
import { IProductRepository } from '../../../abstract/repos/product.repository.interface';
import { injectable } from 'inversify';
import { initMysql } from './connection.manager';

@injectable()
export class MySQLProductRepository implements IProductRepository {
  async getProductsByUser(userId: number): Promise<Product[]> {
    let connection: any;
    let result: Product[] = [];
    try {
      connection = await initMysql();
      const types = await connection.query(`CALL GetProductsByUser(${userId})`);
      result = types[0].map( (product: any) => {
        return {id: product.Id ,
            name: product.Name,
            description: product.Description,
            createdDate: product.CareatedDate} as Product ;
      });
      return result;
    } catch (err) {
      throw err;
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

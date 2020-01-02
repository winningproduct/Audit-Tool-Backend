import { Product } from './../../../models/product';
import { IProductRepository } from '../../../abstract/repos/product.repository.interface';
import { injectable } from 'inversify';
import { initMysql } from './connection.manager';
import { mapDbItems, productMapper } from './dbMapper';

@injectable()
export class MySQLProductRepository implements IProductRepository {
  async getProductByProductPhaseId(productPhaseId: number): Promise<Product> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection.query(
        `CALL GetProductByProductPhaseId(${productPhaseId})`,
      );
      return mapDbItems(result, productMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  async getProductsByUser(userId: number): Promise<Product[]> {
    let connection: any;
    try {
      connection = await initMysql();
      const results = await connection.query(
        `CALL GetProductsByUser(${userId})`,
      );
      return mapDbItems(results, productMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  async getProductById(productId: number): Promise<Product> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection.query(
        `CALL GetProductById(${productId})`,
      );
      return mapDbItems(result, productMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
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

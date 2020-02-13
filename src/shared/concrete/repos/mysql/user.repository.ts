import { injectable } from 'inversify';
import { initMysql } from './connection.manager';
import { IUserRepository } from '@repos/user.repository.interface';
import { Product as ProductEntity } from './entity/product';
import { User as UserEntity } from './entity/user';
import { mapDbItems, userMapper } from './dbMapper';
import { User } from '@models/user';
import { getRepository } from 'typeorm';

@injectable()
export class MySQLUserRepository implements IUserRepository {
  async add(_user: User): Promise<boolean> {
    let connection: any;
    try {
      connection = await initMysql();
      const user = new UserEntity();
      user.firstName = _user.firstName;
      user.lastName = _user.lastName;
      user.email = _user.email;
      user.phoneNumber = _user.phoneNumber;
      user.organizationId = Number(_user.organizationId);
      await connection.manager.save(user);
      return true;
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  async getOrganizationByUserEmail(email: string): Promise<User[]> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection
        .createQueryBuilder()
        .select('users')
        .from(UserEntity, 'users')
        .where('users.email= :email', { email })
        .getRawMany();
      return mapDbItems(result, userMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  async getUsersByProjectId(id: number): Promise<User[]> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection
        .getRepository(ProductEntity)
        .createQueryBuilder('products')
        .innerJoinAndSelect('products.users', 'users', 'products.id = :id', {
          id,
        })
        .getRawMany();
      return mapDbItems(result, userMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  async assignProjectToUser(
    productId: number,
    userId: number,
  ): Promise<boolean> {
    let connection: any;
    try {
      connection = await initMysql();
      const userRepository = getRepository(UserEntity);
      const user = await userRepository.findOneOrFail(userId);
      const userArray = await userRepository.find();
      const productRepository = getRepository(ProductEntity);
      const product = await productRepository.findOneOrFail(productId);
      product.users = userArray;
      product.users.push(user);
      await productRepository.save(product);
      return true;
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  get(_itemId: number): User {
    throw new Error('Method not implemented.');
  }
  update(_itemId: number, _item: User) {
    throw new Error('Method not implemented.');
  }
  delete(_itemId: number) {
    throw new Error('Method not implemented.');
  }
}

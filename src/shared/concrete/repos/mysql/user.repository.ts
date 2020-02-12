import { injectable } from 'inversify';
import { initMysql } from './connection.manager';
import { IUserRepository } from '@repos/user.repository.interface';
import { User } from '@models/user';
import { Product as ProductEntity } from './entity/product';
import { User as UserEntity } from './entity/user';
import { mapDbItems, userMapper } from './dbMapper';
import { User } from '@models/user';

@injectable()
export class MySQLUserRepository implements IUserRepository {
  async add(user: User): Promise<boolean> {
    let connection: any;
    const organizationId = user.organizationId;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const email = user.email;
    const phoneNumber = user.phoneNumber;
    try {
      connection = await initMysql();
      await connection
        .createQueryBuilder()
        .insert(user)
        .into(User)
        .values({
          OrganizationId: organizationId,
          FirstName: firstName,
          LastName: lastName,
          Email: email,
          PhoneNumber: phoneNumber,
        })
        .execute();
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
        .where('users.Email= :email', { email })
        .getRawMany();
      return mapDbItems(result, userMapper)[0];
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

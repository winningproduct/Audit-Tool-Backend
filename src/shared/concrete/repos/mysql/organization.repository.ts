import { IOrganizationRepository } from '../../../abstract/repos/organization.repository.interface';
import { Orgnization } from '../../../models/organization';
import { injectable } from 'inversify';
import { initMysql } from './connection.manager';
import { mapDbItems, userMapper } from './dbMapper';
import { User } from '@models/user';

@injectable()
export class MySQLOrganizationRepository implements IOrganizationRepository {
  /*async getOrganizationByUserEmail(_email: string): Promise<Orgnization[]> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection.query(
        `CALL getOrganizationByUserEmail('${_email}')`,
      );
      return mapDbItems(result, organizationUserMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }*/

  async getOrganizationIdFromDomain(_domain: string): Promise<User[]> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection.query(
        `CALL getOrganizationId('${_domain}')`,
      );
      return result[0];
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }
  get(_itemId: number): Orgnization {
    throw new Error('Method not implemented.');
  }
  add(_item: Orgnization) {
    throw new Error('Method not implemented.');
  }
  update(_itemId: number, _item: Orgnization) {
    throw new Error('Method not implemented.');
  }
  delete(_itemId: number) {
    throw new Error('Method not implemented.');
  }
}

import { IOrganizationRepository } from '../../../abstract/repos/organization.repository.interface';
import { Orgnization } from '../../../models/organization';
import { injectable } from 'inversify';

@injectable()
export class MySQLOrganizationRepository implements IOrganizationRepository {
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

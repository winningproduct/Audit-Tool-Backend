import { Orgnization } from '@models/organization';

export interface IOrganizationService {
  getOrganizationByUserEmail(email: string): Promise<Orgnization[]>;
}

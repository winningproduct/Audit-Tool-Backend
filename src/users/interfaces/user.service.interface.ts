import { User } from '@models/user';

export interface IUserService {
  getOrganizationByUserEmail(email: string): Promise<User[]>;
}

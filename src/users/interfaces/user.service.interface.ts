import { User } from '@models/user';

export interface IUserService {

  addUser(user: User): Promise<boolean>;

  getOrganizationByUserEmail(email: string): Promise<User[]>;
  
}

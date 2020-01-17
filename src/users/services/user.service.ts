import { IUserService } from '../interfaces/user.service.interface';
import { injectable, inject } from 'inversify';
import { TYPES } from 'shared/constants/Types';
import { IUserRepository } from '@repos/user.repository.interface';
import { User } from '@models/user';
@injectable()
export class UserService implements IUserService {
  protected userRepository: IUserRepository;
  constructor(
    @inject(TYPES.UserRepository)
    _userRepository: IUserRepository,
  ) {
    this.userRepository = _userRepository;
  }

  async addUser(user: User) {
    return await this.userRepository.add(user);
  }
}

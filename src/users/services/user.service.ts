import { IUserRepository } from '@repos/user.repository.interface';
import { IUserService } from '../interfaces/user.service.interface';
import { injectable, inject } from 'inversify';
import { TYPES } from 'shared/constants/Types';
@injectable()
export class UserService implements IUserService {
  protected userRepository: IUserRepository;
  constructor(
    @inject(TYPES.UserRepository)
    _userRepository: IUserRepository,
  ) {
    this.userRepository = _userRepository;
  }

  async getOrganizationByUserEmail(email: string) {
    return await this.userRepository.getOrganizationByUserEmail(email);
  }
}

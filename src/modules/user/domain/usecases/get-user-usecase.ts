import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user-repository';
import { UserModel } from '../models/user-model';

@Injectable()
export class GetUserUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  public async call(
    id: string | undefined,
    email: string | undefined,
    password: string | undefined,
  ): Promise<UserModel | undefined> {
    return await this.userRepository.get(id, email, password);
  }
}

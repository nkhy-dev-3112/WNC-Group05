import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user-repository';
import { UserModel } from '../models/user-model';
import { v4 as uuidV4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  public async call(
    email: string,
    password: string,
  ): Promise<UserModel | undefined> {
    const now = new Date();
    const user = new UserModel(uuidV4(), email, password, now, now);

    await this.userRepository.create(user);

    return user;
  }
}

import { Injectable } from '@nestjs/common';
import { GetUserUsecase } from './get-user-usecase';
import { UserModel } from '../models/user-model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ValidateUserUsecase {
  constructor(private readonly getUserUsecase: GetUserUsecase) {}

  async call(id: string | undefined, email: string | undefined, password: string): Promise<UserModel | undefined> {
    const user = await this.getUserUsecase.call(id, email);

    if (!user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return undefined;
  }
}

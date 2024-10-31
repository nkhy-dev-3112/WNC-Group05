import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user-repository';
import { UserModel } from '../../domain/models/user-model';
import { UserDatasource } from '../datasources/user-datasource';

@Injectable()
export class UserRepositoryImpl extends UserRepository {
  constructor(private readonly userDatasource: UserDatasource) {
    super();
  }
  public async create(user: UserModel): Promise<void> {
    await this.userDatasource.create(user);
  }
  public async get(
    userId: string | undefined,
    email: string | undefined,
    password: string | undefined,
  ): Promise<UserModel | undefined> {
    return this.userDatasource.get(userId, email, password);
  }
}

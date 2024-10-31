import { UserModel } from '../models/user-model';

export abstract class UserRepository {
  public abstract create(user: UserModel): Promise<void>;
  public abstract get(
    userId: string | undefined,
    email: string | undefined,
    password: string | undefined,
  ): Promise<UserModel | undefined>;
}

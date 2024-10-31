import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user-entities';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserModel } from '../../domain/models/user-model';

@Injectable()
export class UserDatasource {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async create(user: UserModel): Promise<void> {
    const entity = new UserEntity();

    entity.id = user.id;
    entity.email = user.email;
    entity.password = user.password;
    entity.created_at = user.createdAt;
    entity.updated_at = user.updatedAt;

    await this.userRepository.insert(entity);
  }

  public async get(
    id: string | undefined,
    email: string | undefined,
    password: string | undefined,
  ): Promise<UserModel | undefined> {
    const condition: FindOptionsWhere<UserEntity> = {};

    if (id) {
      condition['id'] = id;
    }

    if (email) {
      condition['email'] = email;
    }

    if (password) {
      condition['password'] = password;
    }

    return (
      await this.userRepository.findOne({
        where: condition,
      })
    )?.toModel();
  }
}

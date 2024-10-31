import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import AuthPayloadEntity from './entities/auth-payload-entity';
import { AuthPayloadModel } from '../../domain/models/auth-payload-model';

@Injectable()
export class AuthPayloadDatasource {
  constructor(
    @InjectRepository(AuthPayloadEntity)
    private readonly authPayloadRepository: Repository<AuthPayloadEntity>,
  ) {}

  async create(authPayload: AuthPayloadModel): Promise<void> {
    const entity = new AuthPayloadEntity();

    entity.id = authPayload.id;
    entity.user_id = authPayload.userId;
    entity.created_at = authPayload.createdAt;

    await this.authPayloadRepository.insert(entity);
  }

  async get(id: string): Promise<AuthPayloadModel | undefined> {
    const authPayload = await this.authPayloadRepository.findOne({
      where: {
        id: id,
      },
    });
    return authPayload?.toModel();
  }
}

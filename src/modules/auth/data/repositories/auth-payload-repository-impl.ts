import { Injectable } from '@nestjs/common';
import { AuthPayloadRepository } from '../../domain/repositories/auth-payload-repository';
import { AuthPayloadDatasource } from '../datasources/auth-payload-datasource';
import { AuthPayloadModel } from '../../domain/models/auth-payload-model';

@Injectable()
export class AuthPayloadRepositoryImpl extends AuthPayloadRepository {
  constructor(private readonly authPayloadDatasource: AuthPayloadDatasource) {
    super();
  }

  public async create(authPayload: AuthPayloadModel): Promise<void> {
    await this.authPayloadDatasource.create(authPayload);
  }

  public async get(id: string): Promise<AuthPayloadModel | undefined> {
    return await this.authPayloadDatasource.get(id);
  }
}

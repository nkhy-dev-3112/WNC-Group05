import { Injectable } from '@nestjs/common';
import { AuthPayloadModel } from '../../models/auth-payload-model';
import { v4 as uuidV4 } from 'uuid';
import { AuthPayloadRepository } from '../../repositories/auth-payload-repository';

@Injectable()
export class CreateAuthPayloadUsecase {
  constructor(private readonly authPayloadRepository: AuthPayloadRepository) {}

  async call(userId: string | undefined): Promise<AuthPayloadModel> {
    const authPayload = new AuthPayloadModel(uuidV4(), userId, new Date());

    await this.authPayloadRepository.create(authPayload);

    return authPayload;
  }
}

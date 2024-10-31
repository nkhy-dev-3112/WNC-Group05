import { Injectable } from '@nestjs/common';
import { AuthPayloadRepository } from '../../repositories/auth-payload-repository';
import { AuthPayloadModel } from '../../models/auth-payload-model';

@Injectable()
export class GetAuthPayloadUsecase {
  constructor(private readonly authPayloadRepository: AuthPayloadRepository) {}

  async call(id: string | undefined): Promise<AuthPayloadModel | undefined> {
    return await this.authPayloadRepository.get(id);
  }
}

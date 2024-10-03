import { Injectable } from '@nestjs/common';
import { ActorRepository } from '../repositories/actor-repository';
import { ActorModel } from '../models/actor-model';

@Injectable()
export class DeleteActorUsecase {
  constructor(private readonly actorRepository: ActorRepository) {}

  async call(actor: ActorModel): Promise<boolean> {
    return await this.actorRepository.delete(actor);
  }
}

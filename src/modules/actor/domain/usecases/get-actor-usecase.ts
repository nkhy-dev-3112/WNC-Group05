import { Injectable } from '@nestjs/common';
import { ActorRepository } from '../repositories/actor-repository';
import { ActorModel } from '../models/actor-model';

@Injectable()
export class GetActorUsecase {
  constructor(private readonly actorRepository: ActorRepository) {}

  public async call(actorId: number): Promise<ActorModel | undefined> {
    return this.actorRepository.get(actorId);
  }
}

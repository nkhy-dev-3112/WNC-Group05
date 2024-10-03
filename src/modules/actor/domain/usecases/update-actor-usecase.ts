import { Injectable } from '@nestjs/common';
import { ActorRepository } from '../repositories/actor-repository';
import { ActorModel } from '../models/actor-model';

@Injectable()
export class UpdateActorUsecase {
  constructor(private readonly actorRepository: ActorRepository) {}

  public async call(
    actor: ActorModel,
    firstName: string | undefined,
    lastName: string | undefined,
  ): Promise<boolean> {
    return await this.actorRepository.update(
      actor,
      firstName,
      lastName,
      new Date(),
    );
  }
}

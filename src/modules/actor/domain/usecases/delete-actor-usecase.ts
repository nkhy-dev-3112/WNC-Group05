import { Injectable } from '@nestjs/common';
import { ActorRepository } from '../repositories/actor-repository';
import { ActorModel } from '../models/actor-model';
import { DeleteFilmActorByActorIdUsecase } from '../../../film/domain/usecases/film-actor/delete-film-actor-by-actor-id-usecase';

@Injectable()
export class DeleteActorUsecase {
  constructor(
    private readonly actorRepository: ActorRepository,
    private readonly deleteFilmActorByIdUsecase: DeleteFilmActorByActorIdUsecase,
  ) {}

  async call(actor: ActorModel): Promise<boolean> {
    await this.deleteFilmActorByIdUsecase.call(actor.actorId);

    return await this.actorRepository.delete(actor);
  }
}

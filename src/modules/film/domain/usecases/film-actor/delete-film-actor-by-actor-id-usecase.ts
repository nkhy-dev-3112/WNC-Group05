import { Injectable } from '@nestjs/common';
import { FilmActorRepository } from '../../repositories/film-actor-repository';

@Injectable()
export class DeleteFilmActorByActorIdUsecase {
  constructor(private readonly filmActorRepository: FilmActorRepository) {}
  public async call(actorId): Promise<boolean> {
    return this.filmActorRepository.deleteByActorId(actorId);
  }
}

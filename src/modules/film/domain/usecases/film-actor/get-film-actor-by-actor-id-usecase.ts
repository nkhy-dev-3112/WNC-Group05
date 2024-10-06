import { Injectable } from '@nestjs/common';
import { FilmActorRepository } from '../../repositories/film-actor-repository';
import { FilmActorModel } from '../../models/film-actor-model';

@Injectable()
export class GetFilmActorByActorIdUsecase {
  constructor(private readonly filmActorRepository: FilmActorRepository) {}

  public async call(actorId: number): Promise<FilmActorModel[] | undefined> {
    return this.filmActorRepository.get(actorId, undefined);
  }
}

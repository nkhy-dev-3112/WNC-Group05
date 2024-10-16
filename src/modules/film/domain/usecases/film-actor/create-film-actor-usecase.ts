import { Injectable } from '@nestjs/common';
import { FilmActorRepository } from '../../repositories/film-actor-repository';
import { FilmActorModel } from '../../models/film-actor-model';

@Injectable()
export class CreateFilmActorUsecase {
  constructor(private readonly filmActorRepository: FilmActorRepository) {}

  async call(filmActor: FilmActorModel): Promise<void> {
    await this.filmActorRepository.create(filmActor);
  }
}

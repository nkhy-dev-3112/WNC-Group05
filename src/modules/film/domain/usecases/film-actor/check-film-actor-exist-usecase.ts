import { BadRequestException, Injectable } from '@nestjs/common';
import { FilmActorRepository } from '../../repositories/film-actor-repository';
import { FilmActorModel } from '../../models/film-actor-model';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class CheckFilmActorExistUsecase {
  constructor(private readonly filmActorRepository: FilmActorRepository) {}

  public async call(filmActor: FilmActorModel): Promise<FilmActorModel> {
    const filmActorModel = await this.filmActorRepository.get(
      filmActor.actorId,
      filmActor.filmId,
    );

    if (!filmActorModel && filmActorModel.length === 0) {
      throw new BadRequestException('Film actor does not exist');
    }
    return filmActor;
  }
}

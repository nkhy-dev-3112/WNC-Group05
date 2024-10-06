import { Injectable } from '@nestjs/common';
import { FilmActorRepository } from '../../domain/repositories/film-actor-repository';
import { FilmActorDataSource } from '../datasources/film-actor-datasource';
import { FilmActorModel } from '../../domain/models/film-actor-model';

@Injectable()
export class FilmActorRepositoryImpl extends FilmActorRepository {
  constructor(private readonly filmActorDatasource: FilmActorDataSource) {
    super();
  }

  public get(
    actorId: number | undefined,
    filmId: number | undefined,
  ): Promise<FilmActorModel[] | undefined> {
    return this.filmActorDatasource.get(actorId, filmId);
  }
  public deleteByActorId(actorId: number): Promise<boolean> {
    return this.filmActorDatasource.deleteByActorId(actorId);
  }
}

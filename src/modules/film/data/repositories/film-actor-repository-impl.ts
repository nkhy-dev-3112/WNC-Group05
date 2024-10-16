import { Injectable } from '@nestjs/common';
import { FilmActorRepository } from '../../domain/repositories/film-actor-repository';
import { FilmActorDataSource } from '../datasources/film-actor-datasource';
import { FilmActorModel } from '../../domain/models/film-actor-model';

@Injectable()
export class FilmActorRepositoryImpl extends FilmActorRepository {
  constructor(private readonly filmActorDatasource: FilmActorDataSource) {
    super();
  }

  public async get(
    actorId: number | undefined,
    filmId: number | undefined,
  ): Promise<FilmActorModel[] | undefined> {
    return this.filmActorDatasource.get(actorId, filmId);
  }
  public async deleteByActorId(actorId: number): Promise<boolean> {
    return await this.filmActorDatasource.deleteByActorId(actorId);
  }

  public async create(filmActorMode: FilmActorModel): Promise<void> {
    await this.filmActorDatasource.create(filmActorMode);
  }
}

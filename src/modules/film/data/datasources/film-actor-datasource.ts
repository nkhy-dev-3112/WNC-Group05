import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmActorEntity } from './entities/film-actor-entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { FilmActorModel } from '../../domain/models/film-actor-model';

@Injectable()
export class FilmActorDataSource {
  constructor(
    @InjectRepository(FilmActorEntity)
    private readonly filmActorRepository: Repository<FilmActorEntity>,
  ) {}

  public async deleteByActorId(actorId: number): Promise<boolean> {
    const result = await this.filmActorRepository.delete(actorId);

    return result.affected > 0;
  }

  public async get(
    actorId: number | undefined,
    filmId: number | undefined,
  ): Promise<FilmActorModel[] | undefined> {
    const condition: FindOptionsWhere<FilmActorEntity> = {};

    if (actorId) {
      condition['actor_id'] = actorId;
    }

    if (filmId) {
      condition['film_id'] = filmId;
    }

    const query = this.filmActorRepository
      .createQueryBuilder()
      .setFindOptions({ where: condition });

    const filmActors = await query.getMany();

    return filmActors.map((filmActor) => filmActor.toModel());
  }
}

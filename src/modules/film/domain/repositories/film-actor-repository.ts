import { FilmActorModel } from '../models/film-actor-model';

export abstract class FilmActorRepository {
  public abstract get(
    actorId: number | undefined,
    filmId: number | undefined,
  ): Promise<FilmActorModel[] | undefined>;

  public abstract deleteByActorId(actorId: number): Promise<boolean>;

  public abstract create(filmActor: FilmActorModel): Promise<void>;
}

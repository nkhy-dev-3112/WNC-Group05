export class FilmActorModel {
  public readonly actorId: number;

  public readonly filmId: number;

  public readonly lastUpdate: Date;

  constructor(actorId: number, filmId: number, lastUpdate: Date) {
    this.actorId = actorId;
    this.filmId = filmId;
    this.lastUpdate = lastUpdate;
  }

  public toJson(): Record<string, any> {
    return {
      actor_id: this.actorId,
      film_id: this.filmId,
      last_update: this.lastUpdate,
    };
  }
}

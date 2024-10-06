import { ApiProperty } from '@nestjs/swagger';

export class FilmActorModel {
  @ApiProperty({ name: 'actor_id' })
  public readonly actorId: number;

  @ApiProperty({ name: 'film_id' })
  public readonly filmId: number;

  @ApiProperty({ name: 'last_update' })
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

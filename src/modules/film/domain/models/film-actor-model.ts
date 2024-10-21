import { ApiProperty } from '@nestjs/swagger';

export class FilmActorModel {
  @ApiProperty({
    name: 'actor_id',
    example: 101,
    description: 'Unique identifier for the actor',
  })
  public readonly actorId: number;

  @ApiProperty({
    name: 'film_id',
    example: 1,
    description: 'Unique identifier for the film',
  })
  public readonly filmId: number;

  @ApiProperty({
    name: 'last_update',
    example: new Date(),
    description: 'Timestamp of the last update for the film-actor relationship',
  })
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

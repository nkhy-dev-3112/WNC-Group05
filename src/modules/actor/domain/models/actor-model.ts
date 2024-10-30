import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilmModel } from '../../../film/domain/models/film-model';

export class ActorModel {
  @ApiProperty({
    name: 'actor_id',
    example: 1,
    description: 'Unique identifier for the actor',
  })
  public readonly actorId: number;

  @ApiProperty({
    name: 'first_name',
    example: 'John',
    description: 'First name of the actor',
  })
  public readonly firstName: string;

  @ApiProperty({
    name: 'last_name',
    example: 'Doe',
    description: 'Last name of the actor',
  })
  public readonly lastName: string;

  @ApiProperty({
    name: 'last_update',
    example: new Date(),
    description: 'Timestamp of the last update for the actor record',
  })
  public readonly lastUpdate: Date;

  constructor(
    actorId: number,
    firstName: string,
    lastName: string,
    lastUpdate: Date,
  ) {
    this.actorId = actorId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.lastUpdate = lastUpdate;
  }

  public toJson(): Record<string, any> {
    return {
      actor_id: this.actorId,
      first_name: this.firstName,
      last_name: this.lastName,
      last_update: this.lastUpdate,
    };
  }
}

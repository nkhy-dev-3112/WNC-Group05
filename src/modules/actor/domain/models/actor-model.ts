import { ApiProperty } from '@nestjs/swagger';

export class ActorModel {
  @ApiProperty({ name: 'actor_id' })
  public readonly actorId: number;

  @ApiProperty({ name: 'first_name' })
  public readonly firstName: string;

  @ApiProperty({ name: 'last_name' })
  public readonly lastName: string;

  @ApiProperty({ name: 'last_update' })
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

import { PickType } from '@nestjs/swagger';
import { IsInt, IsString, Max } from 'class-validator';

export class ActorDto {
  @IsInt()
  actor_id!: number;

  @IsString()
  @Max(45)
  first_name: string;

  @IsString()
  @Max(45)
  last_name: string;
}

export class GetActorParamDto extends PickType(ActorDto, ['actor_id']) {}

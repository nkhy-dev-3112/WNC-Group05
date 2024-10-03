import { PickType } from '@nestjs/swagger';
import { IsInt, IsString, Length } from 'class-validator';

export class ActorDto {
  @IsInt()
  actor_id!: number;

  @IsString()
  @Length(1, 45, {
    message: 'First name must be between 1 and 45 characters long.',
  })
  first_name: string;

  @IsString()
  @Length(1, 45, {
    message: 'Last name must be between 1 and 45 characters long.',
  })
  last_name: string;
}

export class GetActorParamDto {
  @IsString()
  actor_id!: number;
}

export class UpdateActorDto extends PickType(ActorDto, [
  'first_name',
  'last_name',
]) {}

export class CreateActorDto extends PickType(ActorDto, [
  'first_name',
  'last_name',
]) {}

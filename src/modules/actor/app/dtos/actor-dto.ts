import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsInt, IsString, Length } from 'class-validator';

export class ActorDto {
  @ApiProperty({ example: '1' })
  @IsString()
  actor_id!: string;

  @ApiProperty()
  @IsString()
  @Length(1, 45, {
    message: 'First name must be between 1 and 45 characters long.',
  })
  first_name: string;

  @ApiProperty()
  @IsString()
  @Length(1, 45, {
    message: 'Last name must be between 1 and 45 characters long.',
  })
  last_name: string;
}

export class GetActorParamDto {
  @IsString()
  @ApiProperty()
  actor_id!: string;
}

export class UpdateActorDto extends PickType(ActorDto, [
  'first_name',
  'last_name',
]) {}

export class CreateActorDto extends PickType(ActorDto, [
  'first_name',
  'last_name',
]) {}

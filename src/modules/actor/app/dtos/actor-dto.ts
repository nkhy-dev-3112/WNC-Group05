import { ApiProperty, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsString, Length } from 'class-validator';

export class ActorDto {
  @ApiProperty({ example: '1' })
  @IsString()
  actor_id!: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @Length(1, 45, {
    message: 'First name must be between 1 and 45 characters long.',
  })
  @Transform(({ value }) => value.trim().toUpperCase())
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @Length(1, 45, {
    message: 'Last name must be between 1 and 45 characters long.',
  })
  @Transform(({ value }) => value.trim().toUpperCase())
  last_name: string;
}

export class GetActorParamDto extends PickType(ActorDto, ['actor_id']) {}

export class UpdateActorDto extends PickType(ActorDto, [
  'first_name',
  'last_name',
]) {}

export class CreateActorDto extends PickType(ActorDto, [
  'first_name',
  'last_name',
]) {}

import { ApiProperty, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsString, Length } from 'class-validator';

export class ActorDto {
  @ApiProperty({ example: '1' })
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: 'actor_id must be an integer' })
  actor_id!: number;

  @ApiProperty({ example: 'John' })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toUpperCase() : value,
  )
  @Length(1, 45, {
    message: 'First name must be between 1 and 45 characters long.',
  })
  @IsString({ message: 'First name must be string' })
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  @Length(1, 45, {
    message: 'Last name must be between 1 and 45 characters long.',
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toUpperCase() : value,
  )
  @IsString({ message: 'Last name must be string' })
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

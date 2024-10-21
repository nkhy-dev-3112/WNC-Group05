import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsInt, IsString, Length } from 'class-validator';

export class ActorDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  actor_id!: number;

  @ApiProperty({ example: 'John' })
  @IsString()
  @Length(1, 45, {
    message: 'First name must be between 1 and 45 characters long.',
  })
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @Length(1, 45, {
    message: 'Last name must be between 1 and 45 characters long.',
  })
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

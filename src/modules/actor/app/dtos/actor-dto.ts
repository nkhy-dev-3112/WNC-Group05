import {
  ApiProperty,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { PageParamsDto } from '../../../../core/dtos/page-params-dto';
import { SortParamsDto } from '../../../../core/dtos/sort-params-dto';
import { DateParamsDto } from '../../../../core/dtos/date-params-dto';

export class ActorDto {
  @ApiProperty({ example: '1' })
  @IsString()
  actor_id!: string;

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

export class GetActorListQueryDto extends PartialType(
  PickType(IntersectionType(PageParamsDto, SortParamsDto, DateParamsDto), [
    'limit',
    'page',
    'need_total_count',
    'only_count',
    'sort',
    'type',
    'from',
    'to',
    'column',
  ]),
) {}

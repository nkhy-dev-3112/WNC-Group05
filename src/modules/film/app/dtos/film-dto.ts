import {
  ApiProperty,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { FilmRating } from '../../domain/enums/film-rating';
import {
  IsInt,
  IsString,
  IsOptional,
  IsArray,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { PageParamsDto } from '../../../../core/dtos/page-params-dto';
import { DateParamsDto } from '../../../../core/dtos/date-params-dto';
import { SortParamsDto } from '../../../../core/dtos/sort-params-dto';

export class FilmDto {
  @ApiProperty({ example: '1' })
  @IsString()
  film_id!: string;

  @ApiProperty({ example: 'Inception' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'A mind-bending thriller', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 2010, required: false })
  @IsInt()
  @IsOptional()
  release_year?: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  language_id!: number;

  @ApiProperty({ example: 2, required: false })
  @IsInt()
  @IsOptional()
  original_language_id?: number;

  @ApiProperty({ example: 3 })
  @IsInt()
  rental_duration!: number;

  @ApiProperty({ example: 9.99 })
  @IsNumber()
  rental_rate!: number;

  @ApiProperty({ example: 148, required: false })
  @IsInt()
  @IsOptional()
  length?: number;

  @ApiProperty({ example: 20.0 })
  @IsInt()
  replacement_cost!: number;

  @ApiProperty({ example: 'PG-13', enum: FilmRating, required: false })
  @IsOptional()
  @IsEnum(FilmRating)
  rating?: FilmRating;

  @ApiProperty({
    example: ['Deleted scenes', 'Behind the scenes'],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  special_features?: string[];
}

export class GetFilmParamDto extends PickType(FilmDto, ['film_id']) {}

export class CreateFilmActorParamDto extends PickType(FilmDto, ['film_id']) {
  @ApiProperty({ example: '34' })
  @IsString()
  actor_id!: string;
}

export class UpdateFilmDto extends PickType(FilmDto, [
  'title',
  'description',
  'release_year',
  'language_id',
  'original_language_id',
  'rental_duration',
  'rental_rate',
  'rating',
  'length',
  'replacement_cost',
  'special_features',
]) {}

export class GetFilmListQueryDto extends PartialType(
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

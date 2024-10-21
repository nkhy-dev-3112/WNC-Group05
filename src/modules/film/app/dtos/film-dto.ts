import { ApiProperty, PickType } from '@nestjs/swagger';
import { FilmRating } from '../../domain/enums/film-rating';
import {
  IsInt,
  IsString,
  IsOptional,
  IsDate,
  IsArray,
  IsEnum,
} from 'class-validator';

export class FilmDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  film_id!: number;

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
  @IsInt()
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

  @ApiProperty({ example: '2023-10-21T10:00:00Z' })
  @IsDate()
  last_update!: Date;

  @ApiProperty({
    example: ['Deleted scenes', 'Behind the scenes'],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  special_features?: string[];

  @ApiProperty({ example: 'Inception full-text search data', required: false })
  @IsString()
  @IsOptional()
  fulltext?: string;
}

export class GetFilmParamDto extends PickType(FilmDto, ['film_id']) {}

export class CreateFilmActorParamDto extends PickType(FilmDto, ['film_id']) {
  @IsInt()
  actor_id!: number;
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
  'last_update',
  'special_features',
  'fulltext',
]) {}

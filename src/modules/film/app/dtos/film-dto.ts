import { ApiProperty, PickType } from '@nestjs/swagger';
import { FilmRating } from '../../domain/enums/film-rating';
import {
  IsInt,
  IsString,
  IsOptional,
  IsDate,
  IsArray,
  IsEnum,
  IsNumber,
} from 'class-validator';

export class FilmDto {
  @ApiProperty({ example: '1' })
  @IsString()
  film_id!: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  release_year?: number;

  @IsInt()
  language_id!: number;

  @IsInt()
  @IsOptional()
  original_language_id?: number;

  @IsInt()
  rental_duration!: number;

  @ApiProperty({ example: 9.99 })
  @IsNumber()
  rental_rate!: number;

  @IsInt()
  @IsOptional()
  length?: number;

  @IsInt()
  replacement_cost!: number;

  @IsString()
  @IsOptional()
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

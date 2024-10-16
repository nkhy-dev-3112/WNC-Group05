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
  @IsInt()
  film_id!: number;

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

  @IsInt()
  rental_rate!: number;

  @IsInt()
  @IsOptional()
  length?: number;

  @IsInt()
  replacement_cost!: number;

  @IsString()
  @IsOptional()
  rating?: string;

  @IsDate()
  last_update!: Date;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  special_features?: string[];

  @IsString()
  @IsOptional()
  fulltext?: string;
}

export class GetFilmParamDto {
  @IsInt()
  film_id!: number;
}

export class CreateFilmActorParamDto {
  @IsInt()
  film_id!: number;

  @IsInt()
  actor_id!: number;
}

export class UpdateFilmDto {
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

  @IsInt()
  rental_rate!: number;

  @IsInt()
  @IsOptional()
  length?: number;

  @IsInt()
  replacement_cost!: number;

  @IsEnum(FilmRating)
  @IsOptional()
  rating?: FilmRating;

  @IsDate()
  last_update!: Date;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  special_features?: string[];

  @IsString()
  @IsOptional()
  fulltext?: string;
}

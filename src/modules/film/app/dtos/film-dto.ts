import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsOptional,
  IsNumber,
  IsDate,
  IsArray,
  Length,
} from 'class-validator';

export class FilmDto {
  @ApiProperty()
  @IsInt()
  film_id!: number; // New property for film ID

  @ApiProperty()
  @IsString()
  @Length(1, 100, {
    message: 'Title must be between 1 and 100 characters long.',
  })
  title: string; // New property for film title

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string; // Optional property for film description

  @ApiProperty()
  @IsOptional()
  @IsInt()
  release_year?: number; // Optional property for release year

  @ApiProperty()
  @IsInt()
  language_id!: number; // New property for language ID

  @ApiProperty()
  @IsOptional()
  @IsInt()
  original_language_id?: number; // Optional property for original language ID

  @ApiProperty()
  @IsInt()
  rental_duration!: number; // New property for rental duration

  @ApiProperty()
  @IsNumber()
  rental_rate!: number; // New property for rental rate

  @ApiProperty()
  @IsOptional()
  @IsInt()
  length?: number; // Optional property for film length

  @ApiProperty()
  @IsNumber()
  replacement_cost!: number; // New property for replacement cost

  @ApiProperty()
  @IsOptional()
  @IsString()
  rating?: string; // Optional property for film rating

  @ApiProperty()
  @IsDate()
  last_update!: Date; // New property for last update

  @ApiProperty()
  @IsOptional()
  @IsArray()
  special_features?: string[]; // Optional property for special features

  @ApiProperty()
  @IsOptional()
  @IsString()
  fulltext?: string; // Optional property for fulltext
}

export class GetFilmParamDto {
  @IsString()
  @ApiProperty()
  film_id!: number;
}

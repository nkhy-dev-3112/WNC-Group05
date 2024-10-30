import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
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
import { Transform } from 'class-transformer';

export class FilmDto {
  @ApiProperty({ example: '1' })
  @IsInt({ message: 'film_id must be an integer' })
  @Transform(({ value }) => parseInt(value))
  film_id!: number;

  @ApiProperty({ example: 'Inception' })
  @IsString()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toUpperCase() : value,
  )
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

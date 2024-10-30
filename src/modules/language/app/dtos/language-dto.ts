import { ApiProperty, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsInt,
} from 'class-validator';

export class LanguageDto {
  @ApiProperty({ example: '1' })
  @IsInt({ message: 'language_id must be an integer' })
  @Transform(({ value }) => parseInt(value))
  language_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'English' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  name!: string;
}

export class UpdateLanguageDto extends PickType(LanguageDto, ['name']) {}

export class CreateLanguageDto extends PickType(LanguageDto, ['name']) {}

export class GetLanguageParamDto extends PickType(LanguageDto, [
  'language_id',
]) {}

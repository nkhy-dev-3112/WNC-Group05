import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class LanguageDto {
  @IsNumber()
  @ApiProperty({ example: '1' })
  language_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'English' })
  name!: string;
}

export class UpdateLanguageDto extends PickType(LanguageDto, ['name']) {}

export class CreateLanguageDto extends PickType(LanguageDto, ['name']) {}

export class GetLanguageParamDto extends PickType(LanguageDto, [
  'language_id',
]) {}

import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class LanguageDto {
  @IsString()
  @ApiProperty({ example: '1' })
  language_id: string;

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

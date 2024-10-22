import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class LanguageDto {
  @IsString()
  @ApiProperty({ example: '1' })
  language_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateLanguageDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;
}

export class CreateLanguageDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class GetLanguageParamDto {
  @IsString()
  @IsNotEmpty()
  language_id!: string;
}

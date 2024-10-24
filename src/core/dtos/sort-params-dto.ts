import { Transform } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SortType } from '../enums/sort-type';

export class SortParamsDto {
  @ApiProperty()
  @IsString()
  sort!: string;

  @ApiProperty()
  @IsEnum(SortType)
  @Transform(({ value }) => value?.toUpperCase().trim())
  type!: SortType;
}

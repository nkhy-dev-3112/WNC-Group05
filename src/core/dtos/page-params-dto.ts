import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsInt, Max, Min } from 'class-validator';
import { parseBoolean } from '../helpers/utils';

export class PageParamsDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page!: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit!: number;

  @ApiProperty()
  @Transform((value: any) => parseBoolean(value.obj?.need_total_count, false))
  @IsBoolean()
  need_total_count!: boolean;

  @ApiProperty()
  @Transform((value: any) => parseBoolean(value.obj?.only_count, false))
  @IsBoolean()
  only_count!: boolean;
}

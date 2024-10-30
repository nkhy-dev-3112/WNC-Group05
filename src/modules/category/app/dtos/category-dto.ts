import { ApiProperty, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CategoryDto {
  @ApiProperty({ example: '1' })
  @IsInt({ message: 'category_id must be an integer' })
  @Transform(({ value }) => parseInt(value))
  category_id!: number;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @ApiProperty({ example: 'Scary' })
  name!: string;
}

export class UpdateCategoryDto extends PickType(CategoryDto, ['name']) {}
export class CreateCategoryDto extends PickType(CategoryDto, ['name']) {}
export class GetCategoryParamDto extends PickType(CategoryDto, [
  'category_id',
]) {}

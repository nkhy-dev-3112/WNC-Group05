import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryDto {
  @IsString()
  category_id: string;

  @IsString()
  @IsNotEmpty()
  name!: string;
}

export class UpdateCategoryDto extends PickType(CategoryDto, ['name']) {}
export class CreateCategoryDto extends PickType(CategoryDto, ['name']) {}
export class GetCategoryParamDto extends PickType(CategoryDto, [
  'category_id',
]) {}

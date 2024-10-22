import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repositories/category-repository';
import { CategoryModel } from '../models/category-model';

@Injectable()
export class GetCategoryUsecase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  public async call(
    categoryId: number | undefined,
    name: string | undefined,
    relations: string[] | undefined,
  ): Promise<CategoryModel | undefined> {
    return await this.categoryRepository.get(categoryId, name, relations);
  }
}

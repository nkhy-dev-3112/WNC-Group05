import { Injectable } from '@nestjs/common';
import { CategoryModel } from '../models/category-model';
import { CategoryRepository } from '../repositories/category-repository';

@Injectable()
export class CreateCategoryUsecase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  public async call(name: string): Promise<CategoryModel> {
    const now = new Date();
    const maxcategoryId = await this.categoryRepository.getMaxId();

    const category = new CategoryModel(maxcategoryId + 1, name, now, undefined);
    await this.categoryRepository.create(category);

    return category;
  }
}

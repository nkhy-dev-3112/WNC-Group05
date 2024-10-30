import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repositories/category-repository';
import { CategoryModel } from '../models/category-model';

@Injectable()
export class UpdateCategoryUsecase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  public async call(
    category: CategoryModel,
    name: string,
    lastUpdate: Date,
  ): Promise<boolean> {
    return await this.categoryRepository.update(category, name, lastUpdate);
  }
}

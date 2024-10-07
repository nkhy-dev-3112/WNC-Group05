import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repositories/category-repository';

@Injectable()
export class UpdateCategoryUsecase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  public async call(
    categoryId: number,
    name: string,
    lastUpdate: Date,
  ): Promise<boolean> {
    return await this.categoryRepository.update(categoryId, name, lastUpdate);
  }
}

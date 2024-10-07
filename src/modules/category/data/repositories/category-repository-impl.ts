import { Injectable } from '@nestjs/common';
import { CategoryModel } from '../../domain/models/category-model';
import { CategoryRepository } from '../../domain/repositories/category-repository';
import { CategoryDatasource } from '../datasources/category-datasource';

@Injectable()
export class CategoryRepositoryImpl extends CategoryRepository {
  constructor(private readonly categoryDatasource: CategoryDatasource) {
    super();
  }

  public async create(category: CategoryModel): Promise<void> {
    await this.categoryDatasource.create(category);
  }
  public async get(
    categoryId: number | undefined,
    name: string | undefined,
  ): Promise<CategoryModel | undefined> {
    return this.categoryDatasource.get(categoryId, name);
  }
  public async update(
    categoryId: number,
    name: string | undefined,
    lastUpdate: Date | undefined,
  ): Promise<boolean> {
    return this.categoryDatasource.update(categoryId, name, lastUpdate);
  }
  public async delete(categoryId: number): Promise<void> {
    await this.categoryDatasource.delete(categoryId);
  }
  public async getMaxId(): Promise<number> {
    return this.categoryDatasource.getMaxId();
  }
}

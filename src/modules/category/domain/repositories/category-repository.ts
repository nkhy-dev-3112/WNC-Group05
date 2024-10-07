import { CategoryModel } from '../models/category-model';

export abstract class CategoryRepository {
  public abstract create(category: CategoryModel): Promise<void>;
  public abstract get(
    categoryId: number | undefined,
    name: string | undefined,
  ): Promise<CategoryModel | undefined>;
  public abstract update(
    categoryId: number,
    name: string | undefined,
    lastUpdate: Date | undefined,
  ): Promise<boolean>;
  public abstract delete(categoryId: number): Promise<void>;
  public abstract getMaxId(): Promise<number>;
}

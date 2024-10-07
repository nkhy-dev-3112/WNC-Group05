import { Injectable } from '@nestjs/common';
import { CategoryEntity } from './entities/category-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CategoryModel } from '../../domain/models/category-model';

@Injectable()
export class CategoryDatasource {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  public async create(category: CategoryModel): Promise<void> {
    const entity = new CategoryEntity();

    entity.category_id = category.categoryId;
    entity.name = category.name;
    entity.last_update = category.lastUpdate;

    await this.categoryRepository.insert(entity);
  }

  public async get(
    categoryId: number | undefined,
    name: string | undefined,
  ): Promise<CategoryModel | undefined> {
    const condition: FindOptionsWhere<CategoryEntity> = {};

    if (categoryId) {
      condition['category_id'] = categoryId;
    }

    if (name) {
      condition['name'] = name;
    }

    return (
      await this.categoryRepository.findOne({
        where: condition,
      })
    )?.toModel();
  }

  public async update(
    categoryId: number,
    name: string | undefined,
    lastUpdate: Date | undefined,
  ): Promise<boolean> {
    const data = {
      ...(name !== undefined && { name }),
      ...(lastUpdate !== undefined && { lastUpdate }),
    };

    if (Object.keys(data).length > 0) {
      await this.categoryRepository.update(categoryId, {
        ...data,
      });
      return true;
    }
    return false;
  }

  public async delete(categoryId: number): Promise<void> {
    await this.categoryRepository.delete(categoryId);
  }

  public async getMaxId(): Promise<number> {
    return (await this.categoryRepository.maximum('category_id')) || 0;
  }
}

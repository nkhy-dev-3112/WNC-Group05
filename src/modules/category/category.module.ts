import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './data/datasources/entities/category-entity';
import { CategoryRepository } from './domain/repositories/category-repository';
import { CategoryRepositoryImpl } from './data/repositories/category-repository-impl';
import { CategoryDatasource } from './data/datasources/category-datasource';
import { CreateCategoryUsecase } from './domain/usecases/create-category-usecase';
import { GetCategoryUsecase } from './domain/usecases/get-category-usecase';
import { UpdateCategoryUsecase } from './domain/usecases/update-category-usecase';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [],
  providers: [
    {
      provide: CategoryRepository,
      useClass: CategoryRepositoryImpl,
    },
    CategoryDatasource,
    CreateCategoryUsecase,
    GetCategoryUsecase,
    UpdateCategoryUsecase,
  ],
})
export class LanguageModule {}

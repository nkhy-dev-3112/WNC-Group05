import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmActorEntity } from './data/datasources/entities/film-actor-entity';
import { FilmActorRepository } from './domain/repositories/film-actor-repository';
import { FilmActorRepositoryImpl } from './data/repositories/film-actor-repository-impl';
import { FilmActorDataSource } from './data/datasources/film-actor-datasource';
import { GetFilmActorByActorIdUsecase } from './domain/usecases/film-actor/get-film-actor-by-actor-id-usecase';
import { DeleteFilmActorByActorIdUsecase } from './domain/usecases/film-actor/delete-film-actor-by-actor-id-usecase';
import { FilmEntity } from './data/datasources/entities/film-entity';
import { LanguageModule } from '../language/language.module';
import { GetFilmUsecase } from './domain/usecases/film/get-film-usecase';
import { FilmRepository } from './domain/repositories/film-repository';
import { FilmRepositoryImpl } from './data/repositories/film-repository-impl';
import { FilmCategoryEntity } from './data/datasources/entities/film-category-entity';
import { FilmController } from './app/controllers/api/v1/film-controller';
import { FilmDatasource } from './data/datasources/film-datasource';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FilmEntity, FilmActorEntity, FilmCategoryEntity]),
    forwardRef(() => LanguageModule),
    forwardRef(() => CategoryModule),
  ],
  controllers: [FilmController],
  providers: [
    {
      provide: FilmActorRepository,
      useClass: FilmActorRepositoryImpl,
    },
    {
      provide: FilmRepository,
      useClass: FilmRepositoryImpl,
    },
    FilmActorDataSource,
    FilmDatasource,
    GetFilmActorByActorIdUsecase,
    DeleteFilmActorByActorIdUsecase,
    GetFilmUsecase,
  ],
  exports: [DeleteFilmActorByActorIdUsecase, GetFilmActorByActorIdUsecase],
})
export class FilmModule {}

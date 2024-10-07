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

@Module({
  imports: [
    TypeOrmModule.forFeature([FilmEntity, FilmActorEntity]),
    forwardRef(() => LanguageModule),
  ],
  controllers: [],
  providers: [
    {
      provide: FilmActorRepository,
      useClass: FilmActorRepositoryImpl,
    },
    FilmActorDataSource,
    GetFilmActorByActorIdUsecase,
    DeleteFilmActorByActorIdUsecase,
  ],
  exports: [DeleteFilmActorByActorIdUsecase, GetFilmActorByActorIdUsecase],
})
export class FilmModule {}

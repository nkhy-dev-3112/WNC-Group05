import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmEntity } from './data/datasources/entities/film-entity';
import { FilmRepository } from './domain/repositories/film-repository';
import { FilmRepositoryImpl } from './data/repositories/film-repository-impl';
import { FilmController } from './app/controllers/api/v1/film-controller';
import { FilmDatasource } from './data/datasources/film-datasource';
import { ActorModule } from '../actor/actor.module';
import { GetFilmListUsecase } from './domain/usecases/film/get-film-list-usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([FilmEntity]),
    forwardRef(() => ActorModule),
  ],
  controllers: [FilmController],
  providers: [
    {
      provide: FilmRepository,
      useClass: FilmRepositoryImpl,
    },
    FilmDatasource,
    GetFilmListUsecase,
  ],
  exports: [],
})
export class FilmModule {}

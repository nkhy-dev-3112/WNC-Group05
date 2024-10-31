import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmController } from './app/controllers/api/v1/film-controller';
import { FilmEntity } from './data/datasources/entities/film-entity';
import { FilmDatasource } from './data/datasources/film-datasource';
import { FilmRepositoryImpl } from './data/repositories/film-repository-impl';
import { FilmRepository } from './domain/repositories/film-repository';
import { GetFilmListUsecase } from './domain/usecases/film/get-film-list-usecase';
import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth-module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FilmEntity]),
    forwardRef(() => AuthModule),
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
})
export class FilmModule {}

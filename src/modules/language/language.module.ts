import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageEntity } from './data/datasources/entities/language-entity';
import { LanguageRepository } from './domain/repositories/language-repository';
import { LanguageRepositoryImpl } from './data/repositories/language-repository-impl';
import { LanguageDatasource } from './data/datasources/language-datasource';
import { CreateLanguageUsecase } from './domain/usecases/create-language-usecase';
import { GetLanguageUsecase } from './domain/usecases/get-language-usecase';
import { UpdateLanguageUsecase } from './domain/usecases/update-language-usecase';
import { FilmModule } from '../film/film.module';

@Module({
  imports: [TypeOrmModule.forFeature([LanguageEntity])],
  controllers: [],
  providers: [
    {
      provide: LanguageRepository,
      useClass: LanguageRepositoryImpl,
    },
    LanguageDatasource,
    CreateLanguageUsecase,
    GetLanguageUsecase,
    UpdateLanguageUsecase,
  ],
})
export class LanguageModule {}

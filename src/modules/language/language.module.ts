import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageEntity } from './data/datasources/entities/language-entity';
import { LanguageRepository } from './domain/repositories/language-repository';
import { LanguageRepositoryImpl } from './data/repositories/language-repository-impl';
import { LanguageDatasource } from './data/datasources/language-datasource';
import { CreateLanguageUsecase } from './domain/usecases/create-language-usecase';
import { GetLanguageUsecase } from './domain/usecases/get-language-usecase';
import { UpdateLanguageUsecase } from './domain/usecases/update-language-usecase';
import { LanguageController } from './app/controllers/api/v1/language-controller';

@Module({
  imports: [TypeOrmModule.forFeature([LanguageEntity])],
  controllers: [LanguageController],
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
  exports: [GetLanguageUsecase],
})
export class LanguageModule {}

import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import database from './config/database';
import { AppController } from './app/controllers/api/public/app-controller';
import { GetInformationUsecase } from './domain/usecases/get-infomation-usecase';
import app from './config/app';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { FilmModule } from '../film/film.module';
@Module({
  imports: [
    ConfigModule.forRoot({ load: [database, app] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<TypeOrmModuleOptions>(
          'database',
        ) as TypeOrmModuleOptions,
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    forwardRef(() => FilmModule),
  ],
  controllers: [AppController],
  providers: [GetInformationUsecase],
})
export class AppModule {}

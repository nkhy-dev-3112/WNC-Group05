import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import database from './config/database';
import { AppController } from './app/controllers/api/public/app-controller';
import { GetInformationUsecase } from './domain/usecases/get-infomation-usecase';
import app from './config/app';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { SentryModule } from '@sentry/nestjs/setup';
import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import sentry from './config/sentry';
import { FilmModule } from '../film/film.module';
@Module({
  imports: [
    ConfigModule.forRoot({ load: [database, app, sentry] }),
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
    SentryModule.forRoot(),
    forwardRef(() => FilmModule),
  ],
  controllers: [AppController],
  providers: [GetInformationUsecase],
})
export class AppModule {
  constructor(private configService: ConfigService) {
    this.initializeSentry();
  }

  initializeSentry() {
    Sentry.init({
      dsn: this.configService.get<string>('sentry.dsn'),
      integrations: [nodeProfilingIntegration()],
      tracesSampleRate: 1.0,
      profilesSampleRate: 1.0,
      environment: 'localhost',
    });
  }
}

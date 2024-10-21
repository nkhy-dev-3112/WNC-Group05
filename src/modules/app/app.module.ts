import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import database from './config/database';
import { AppController } from './app/controllers/api/public/app-controller';
import { GetInformationUsecase } from './domain/usecases/get-infomation-usecase';
import app from './config/app';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { ActorModule } from '../actor/actor.module';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';
import { APP_FILTER } from '@nestjs/core';
import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import sentry from './config/sentry';
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
    forwardRef(() => ActorModule),
  ],
  controllers: [AppController],
  providers: [
    GetInformationUsecase,
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter,
    },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {
    this.initializeSentry();
  }

  initializeSentry() {
    // Initialize Sentry with ConfigService
    Sentry.init({
      dsn: this.configService.get<string>('sentry.dsn'), // Fetch DSN from .env file
      integrations: [nodeProfilingIntegration()],
      // Tracing configuration
      tracesSampleRate: 1.0, // Capture 100% of the transactions
      // Set sampling rate for profiling (relative to tracesSampleRate)
      profilesSampleRate: 1.0,
    });
  }
}

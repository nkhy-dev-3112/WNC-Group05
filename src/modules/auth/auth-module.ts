import { forwardRef, Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { AuthService } from './data/services/auth-service';
import { AuthController } from './app/auth-controller';
import { ActorModule } from '../actor/actor.module';
import { AuthPayloadRepository } from './domain/repositories/auth-payload-repository';
import { AuthPayloadRepositoryImpl } from './data/repositories/auth-payload-repository-impl';
import { CreateAuthPayloadUsecase } from './domain/usecases/auth-payload/create-auth-payload-usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import AuthPayloadEntity from './data/datasources/entities/auth-payload-entity';
import { UserModule } from '../user/user-module';
import { AuthPayloadDatasource } from './data/datasources/auth-payload-datasource';
import { GetAuthPayloadUsecase } from './domain/usecases/auth-payload/get-auth-payload-usecase';
import { ConfigModule, ConfigService } from '@nestjs/config';
import auth from './config/auth';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [auth],
    }),
    TypeOrmModule.forFeature([AuthPayloadEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): any =>
        configService.get<JwtModuleOptions>('auth.jwt'),
    }),
    forwardRef(() => ActorModule),
    forwardRef(() => UserModule),
  ],
  providers: [
    AuthService,
    {
      provide: AuthPayloadRepository,
      useClass: AuthPayloadRepositoryImpl,
    },
    AuthPayloadDatasource,
    CreateAuthPayloadUsecase,
    GetAuthPayloadUsecase,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

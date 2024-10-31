import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './data/datasources/entities/user-entities';
import { UserRepository } from './domain/repositories/user-repository';
import { UserRepositoryImpl } from './data/repositories/user-repsitory-impl';
import { UserDatasource } from './data/datasources/user-datasource';
import { CreateUserUsecase } from './domain/usecases/create-user-usecase';
import { GetUserUsecase } from './domain/usecases/get-user-usecase';
import { AuthModule } from '../auth/auth-module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [],
  providers: [
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
    UserDatasource,
    CreateUserUsecase,
    GetUserUsecase,
  ],
  exports: [GetUserUsecase, CreateUserUsecase],
})
export class UserModule {}

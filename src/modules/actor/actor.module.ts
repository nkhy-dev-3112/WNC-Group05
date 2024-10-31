import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorEntity } from './data/datasource/entities/actor-entity';
import { ActorController } from './app/controllers/api/v1/actor-controller';
import { ActorRepository } from './domain/repositories/actor-repository';
import { ActorRepositoryImpl } from './data/repositories/actor-repository-impl';
import { ActorDatasource } from './data/datasource/actor-datasource';
import { GetActorListUsecase } from './domain/usecases/get-actor-list-usecase';
import { AuthModule } from '../auth/auth-module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActorEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [ActorController],
  providers: [
    {
      provide: ActorRepository,
      useClass: ActorRepositoryImpl,
    },
    ActorDatasource,
    GetActorListUsecase,
  ],
  exports: [],
})
export class ActorModule {}

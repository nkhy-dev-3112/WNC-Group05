import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorEntity } from './data/datasource/entities/actor-entities';
import { AppModule } from '../app/app.module';
import { ActorController } from './app/controllers/api/v1/actor-controller';
import { ActorRepository } from './domain/repositories/actor-repository';
import { ActorRepositoryImpl } from './data/repositories/actor-repository-impl';
import { ActorDatasource } from './data/datasource/actor-datasource';
import { GetActorUsecase } from './domain/usecases/get-actor-usecase';
import { GetActorListUsecase } from './domain/usecases/get-actor-list-usecase';
import { UpdateActorUsecase } from './domain/usecases/update-actor-usecase';
import { CreateActorUsecase } from './domain/usecases/create-actor-usecase';
import { DeleteActorUsecase } from './domain/usecases/delete-actor-usecase';

@Module({
  imports: [TypeOrmModule.forFeature([ActorEntity])],
  controllers: [ActorController],
  providers: [
    {
      provide: ActorRepository,
      useClass: ActorRepositoryImpl,
    },
    ActorDatasource,
    GetActorUsecase,
    GetActorListUsecase,
    UpdateActorUsecase,
    CreateActorUsecase,
    DeleteActorUsecase,
  ],
})
export class ActorModule {}

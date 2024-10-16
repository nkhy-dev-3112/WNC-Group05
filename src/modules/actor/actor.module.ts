import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorEntity } from './data/datasource/entities/actor-entity';
import { ActorController } from './app/controllers/api/v1/actor-controller';
import { ActorRepository } from './domain/repositories/actor-repository';
import { ActorRepositoryImpl } from './data/repositories/actor-repository-impl';
import { ActorDatasource } from './data/datasource/actor-datasource';
import { GetActorUsecase } from './domain/usecases/get-actor-usecase';
import { GetActorListUsecase } from './domain/usecases/get-actor-list-usecase';
import { UpdateActorUsecase } from './domain/usecases/update-actor-usecase';
import { CreateActorUsecase } from './domain/usecases/create-actor-usecase';
import { DeleteActorUsecase } from './domain/usecases/delete-actor-usecase';
import { FilmModule } from '../film/film.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActorEntity]),
    forwardRef(() => FilmModule),
  ],
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
  exports: [GetActorUsecase],
})
export class ActorModule {}

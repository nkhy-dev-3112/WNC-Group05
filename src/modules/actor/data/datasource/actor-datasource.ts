import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActorEntity } from './entities/actor-entities';
import { Repository } from 'typeorm';
import { ActorModel } from '../../domain/models/actor-model';

@Injectable()
export class ActorDatasource {
  constructor(
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
  ) {}

  public async get(actorId: number): Promise<ActorModel | undefined> {
    return (
      await this.actorRepository.findOne({
        where: {
          actor_id: actorId,
        },
      })
    )?.toModel();
  }

  public async getList(): Promise<ActorModel[] | undefined> {
    const actors = await this.actorRepository.find();
    return actors.map((actor) => actor.toModel());
  }
}

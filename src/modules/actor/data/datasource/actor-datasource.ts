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

  public async update(
    actor: ActorModel,
    firstName: string | undefined,
    lastName: string | undefined,
    lastUpdate: Date,
  ): Promise<boolean> {
    const data = {
      ...(firstName !== undefined && { first_name: firstName }),
      ...(lastName !== undefined && { last_name: lastName }),
    };

    if (Object.keys(data).length > 0) {
      await this.actorRepository.update(actor.id, {
        ...data,
        last_update: lastUpdate,
      });
      return true;
    }
    return false;
  }
}

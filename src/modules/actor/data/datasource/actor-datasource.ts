import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActorEntity } from './entities/actor-entities';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ActorModel } from '../../domain/models/actor-model';

@Injectable()
export class ActorDatasource {
  constructor(
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
  ) {}

  public async create(actor: ActorModel): Promise<void> {
    const entity = new ActorEntity();

    entity.actor_id = actor.id;
    entity.first_name = actor.firstName;
    entity.last_name = actor.lastName;
    entity.last_update = actor.lastUpdate;

    await this.actorRepository.insert(entity);
  }

  public async get(
    actorId: number | undefined,
    firstName: string | undefined,
    lastName: string | undefined,
  ): Promise<ActorModel | undefined> {
    const condition: FindOptionsWhere<ActorEntity> = {};

    if (actorId) {
      condition['actor_id'] = actorId;
    }

    if (firstName) {
      condition['first_name'] = firstName;
    }

    if (lastName) {
      condition['last_name'] = lastName;
    }

    return (
      await this.actorRepository.findOne({
        where: condition,
      })
    )?.toModel();
  }

  public async getList(): Promise<ActorModel[] | undefined> {
    const actors = await this.actorRepository.find();
    return actors.map((actor) => actor.toModel());
  }

  public async getMaxId(): Promise<number> {
    return (await this.actorRepository.maximum('actor_id')) || 0;
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

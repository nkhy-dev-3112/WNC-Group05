import { Injectable } from '@nestjs/common';
import { ActorRepository } from '../../domain/repositories/actor-repository';
import { ActorModel } from '../../domain/models/actor-model';
import { ActorDatasource } from '../datasource/actor-datasource';

@Injectable()
export class ActorRepositoryImpl extends ActorRepository {
  constructor(private readonly actorDatasource: ActorDatasource) {
    super();
  }

  public create(actor: ActorModel): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async update(
    actor: ActorModel,
    firstName: string | undefined,
    lastName: string | undefined,
    lastUpdate: Date,
  ): Promise<boolean> {
    return await this.actorDatasource.update(
      actor,
      firstName,
      lastName,
      lastUpdate,
    );
  }
  public async get(actorId: number): Promise<ActorModel | undefined> {
    return await this.actorDatasource.get(actorId);
  }
  public async getList(): Promise<ActorModel[] | undefined> {
    return await this.actorDatasource.getList();
  }
}

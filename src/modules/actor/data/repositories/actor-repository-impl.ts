import { Injectable } from '@nestjs/common';
import { ActorRepository } from '../../domain/repositories/actor-repository';
import { ActorModel } from '../../domain/models/actor-model';
import { ActorDatasource } from '../datasource/actor-datasource';
import { DateFilterParams } from '../../../../core/models/date-filter-params';
import { PageParams } from '../../../../core/models/page-params';
import { SortParams } from '../../../../core/models/sort-params';
import { PageList } from '../../../../core/models/page-list';

@Injectable()
export class ActorRepositoryImpl extends ActorRepository {
  constructor(private readonly actorDatasource: ActorDatasource) {
    super();
  }

  public async create(actor: ActorModel): Promise<void> {
    await this.actorDatasource.create(actor);
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
  public async get(
    actorId: number | undefined,
    firstName: string | undefined,
    lastName: string | undefined,
    relations: string[] | undefined,
  ): Promise<ActorModel | undefined> {
    return await this.actorDatasource.get(
      actorId,
      firstName,
      lastName,
      relations,
    );
  }
  public async list(
    pageParams: PageParams,
    sortParams: SortParams,
    dateFilterParams: DateFilterParams,
    relations: string[] | undefined,
  ): Promise<PageList<ActorModel>> {
    return await this.actorDatasource.list(
      pageParams,
      sortParams,
      dateFilterParams,
      relations,
    );
  }
  public async getMaxId(): Promise<number> {
    return await this.actorDatasource.getMaxId();
  }
  public async delete(actor: ActorModel): Promise<boolean> {
    return await this.actorDatasource.delete(actor);
  }
}

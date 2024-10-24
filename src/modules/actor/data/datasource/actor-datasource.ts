import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  FindOptionsWhere,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { ActorModel } from '../../domain/models/actor-model';
import { ActorEntity } from './entities/actor-entity';
import { DateFilterParams } from '../../../../core/models/date-filter-params';
import { PageParams } from '../../../../core/models/page-params';
import { SortParams } from '../../../../core/models/sort-params';
import { PageList } from '../../../../core/models/page-list';

@Injectable()
export class ActorDatasource {
  constructor(
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
  ) {}

  public async create(actor: ActorModel): Promise<void> {
    const entity = new ActorEntity();

    entity.actor_id = actor.actorId;
    entity.first_name = actor.firstName;
    entity.last_name = actor.lastName;
    entity.last_update = actor.lastUpdate;

    await this.actorRepository.insert(entity);
  }

  public async get(
    actorId: number | undefined,
    firstName: string | undefined,
    lastName: string | undefined,
    relations: string[] | undefined,
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
        relations: relations,
      })
    )?.toModel();
  }

  public async list(
    pageParams: PageParams,
    sortParams: SortParams,
    dateFilterParams: DateFilterParams,
    relations: string[] | undefined,
  ): Promise<PageList<ActorModel>> {
    const condition: FindOptionsWhere<ActorEntity> = {};
    const orderBy: Record<any, any> = {};

    if (dateFilterParams && dateFilterParams.column !== undefined) {
      if (dateFilterParams.from && dateFilterParams.to) {
        condition[dateFilterParams.column] = <any>(
          Between(dateFilterParams.from, dateFilterParams.to)
        );
      } else if (dateFilterParams.from) {
        condition[dateFilterParams.column] = <any>(
          MoreThanOrEqual(dateFilterParams.from)
        );
      } else if (dateFilterParams.to) {
        condition[dateFilterParams.column] = <any>(
          LessThanOrEqual(dateFilterParams.to)
        );
      }
    }

    if (sortParams) {
      orderBy[sortParams.sort] = sortParams.type;
    }

    const query = this.actorRepository.createQueryBuilder();

    query.setFindOptions({
      where: condition,
      relations: relations,
      skip: pageParams.limit * (pageParams.page - 1),
      take: pageParams.limit,
      order: orderBy,
    });

    let totalCount;
    if (pageParams.needTotalCount) {
      totalCount = await query.getCount();
    }

    let actors: ActorEntity[] = [];
    if (!pageParams.onlyCount) {
      actors = await query.getMany();
    }
    return new PageList(
      pageParams.page,
      totalCount,
      actors.map((actor) => actor.toModel()),
    );
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
      await this.actorRepository.update(actor.actorId, {
        ...data,
        last_update: lastUpdate,
      });
      return true;
    }
    return false;
  }

  public async delete(actor: ActorModel): Promise<boolean> {
    const result = await this.actorRepository.delete(actor.actorId);
    return result.affected > 0;
  }
}

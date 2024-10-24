import { Injectable } from '@nestjs/common';
import { ActorRepository } from '../repositories/actor-repository';
import { ActorModel } from '../models/actor-model';
import { PageList } from '../../../../core/models/page-list';
import { DateFilterParams } from '../../../../core/models/date-filter-params';
import { PageParams } from '../../../../core/models/page-params';
import { SortParams } from '../../../../core/models/sort-params';

@Injectable()
export class GetActorListUsecase {
  constructor(private readonly actorRepository: ActorRepository) {}

  public async call(
    pageParams: PageParams,
    sortParams: SortParams,
    dateFilterParams: DateFilterParams,
    relations: string[] | undefined,
  ): Promise<PageList<ActorModel>> {
    return await this.actorRepository.list(
      pageParams,
      sortParams,
      dateFilterParams,
      relations,
    );
  }
}

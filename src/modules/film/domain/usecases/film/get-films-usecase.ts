import { Injectable } from '@nestjs/common';
import { FilmRepository } from '../../repositories/film-repository';
import { PageParams } from '../../../../../core/models/page-params';
import { SortParams } from '../../../../../core/models/sort-params';
import { DateFilterParams } from '../../../../../core/models/date-filter-params';
import { PageList } from '../../../../../core/models/page-list';
import { FilmModel } from '../../models/film-model';

@Injectable()
export class GetFilmsUsecase {
  constructor(private readonly filmRepository: FilmRepository) {}

  public async call(
    pageParams: PageParams,
    sortParams: SortParams,
    dateFilterParams: DateFilterParams,
    relations: string[] | undefined,
  ): Promise<PageList<FilmModel>> {
    return await this.filmRepository.list(
      pageParams,
      sortParams,
      dateFilterParams,
      relations,
    );
  }
}

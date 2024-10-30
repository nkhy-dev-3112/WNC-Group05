import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmEntity } from './entities/film-entity';
import {
  Between,
  FindOptionsWhere,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { FilmModel } from '../../domain/models/film-model';
import { FilmRating } from '../../domain/enums/film-rating';
import { DateFilterParams } from '../../../../core/models/date-filter-params';
import { PageList } from '../../../../core/models/page-list';
import { PageParams } from '../../../../core/models/page-params';
import { SortParams } from '../../../../core/models/sort-params';

@Injectable()
export class FilmDatasource {
  constructor(
    @InjectRepository(FilmEntity)
    private readonly filmRepository: Repository<FilmEntity>,
  ) {}

  public async get(
    filmId: number | undefined,
    title: string | undefined,
    relations: string[] | undefined,
  ): Promise<FilmModel | undefined> {
    const condition: FindOptionsWhere<FilmEntity> = {};

    if (filmId) {
      condition['film_id'] = filmId;
    }

    if (title) {
      condition['title'] = title;
    }

    const options = {
      where: condition,
    };

    if (relations !== undefined) {
      options['relations'] = relations;
    }

    return (await this.filmRepository.findOne(options))?.toModel();
  }
  public async list(
    pageParams: PageParams,
    sortParams: SortParams | undefined,
    dateFilterParams: DateFilterParams | undefined,
    relations: string[] | undefined,
  ): Promise<PageList<FilmModel>> {
    const condition: FindOptionsWhere<FilmEntity> = {};
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
    const query = this.filmRepository.createQueryBuilder();

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

    let films: FilmEntity[] = [];
    if (!pageParams.onlyCount) {
      films = await query.getMany();
    }

    return new PageList(
      pageParams.page,
      totalCount,
      films.map((film) => film.toModel()),
    );
  }

  public async update(
    film: FilmModel,
    title: string | undefined,
    description: string | undefined,
    releaseYear: number | undefined,
    languageId: number | undefined,
    originalLanguageId: number | undefined,
    rentalDuration: number,
    rentalRate: number | undefined,
    length: number | undefined,
    replacementCost: number | undefined,
    rating: FilmRating | undefined,
    specialFeatures: string[] | undefined,
    fullText: string | undefined,
    lastUpdate: Date | undefined,
  ): Promise<boolean> {
    const data = {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(releaseYear !== undefined && { release_year: releaseYear }),
      ...(languageId !== undefined && { language_id: languageId }),
      ...(originalLanguageId !== undefined && {
        original_language_id: originalLanguageId,
      }),
      ...(rentalDuration !== undefined && { rental_duration: rentalDuration }),
      ...(rentalRate !== undefined && { rental_rate: rentalRate }),
      ...(length !== undefined && { length: length }),
      ...(replacementCost !== undefined && {
        replacement_cost: replacementCost,
      }),
      ...(rating !== undefined && { rating }),
      ...(specialFeatures !== undefined && {
        special_features: specialFeatures,
      }),
      ...(fullText !== undefined && { full_text: fullText }),
      ...(lastUpdate !== undefined && { last_update: lastUpdate }),
    };

    if (Object.keys(data).length > 0) {
      await this.filmRepository.update(film.filmId, {
        ...data,
      });
      return true;
    }
    return false;
  }
}

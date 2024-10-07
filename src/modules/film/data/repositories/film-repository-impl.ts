import { Injectable } from '@nestjs/common';
import { FilmDatasource } from '../datasources/film-datasource';
import { FilmRepository } from '../../domain/repositories/film-repository';
import { FilmRating } from '../../domain/enums/film-rating';
import { FilmModel } from '../../domain/models/film-model';

@Injectable()
export class FilmRepositoryImpl extends FilmRepository {
  constructor(private readonly filmDatasouce: FilmDatasource) {
    super();
  }

  public get(
    filmId: number | undefined,
    title: string | undefined,
    relations: string[] | undefined,
  ): Promise<FilmModel | undefined> {
    return this.filmDatasouce.get(filmId, title, relations);
  }
  public update(
    film: FilmModel,
    title: string | undefined,
    description: string | undefined,
    releaseYear: number | undefined,
    languageId: number | undefined,
    originalLanguageId: number | undefined,
    rentalDuration: number,
    rentalRate: number | undefined,
    replacementCost: number | undefined,
    rating: FilmRating | undefined,
    specialFeatures: string[] | undefined,
    fullText: string | undefined,
    lastUpdate: Date | undefined,
  ): Promise<boolean> {
    return this.filmDatasouce.update(
      film,
      title,
      description,
      releaseYear,
      languageId,
      originalLanguageId,
      rentalDuration,
      rentalRate,
      replacementCost,
      rating,
      specialFeatures,
      fullText,
      lastUpdate,
    );
  }
}

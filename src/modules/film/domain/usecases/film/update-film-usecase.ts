import { Injectable } from '@nestjs/common';
import { FilmRepository } from '../../repositories/film-repository';
import { FilmRating } from '../../enums/film-rating';
import { FilmModel } from '../../models/film-model';

@Injectable()
export class UpdateFilmUsecase {
  constructor(private readonly filmRepository: FilmRepository) {}

  public async call(
    film: FilmModel,
    title: string | undefined,
    description: string | undefined,
    releaseYear: number | undefined,
    languageId: number | undefined,
    originalLanguageId: number | undefined,
    rentalDuration: number | undefined,
    rentalRate: number | undefined,
    length: number | undefined,
    replacementCost: number | undefined,
    rating: FilmRating | undefined,
    specialFeatures: string[] | undefined,
    fulltext: string | undefined,
  ): Promise<boolean> {
    return await this.filmRepository.update(
      film,
      title,
      description,
      releaseYear,
      languageId,
      originalLanguageId,
      rentalDuration,
      rentalRate,
      length,
      replacementCost,
      rating,
      specialFeatures,
      fulltext,
      new Date(),
    );
  }
}

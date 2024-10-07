import { FilmRating } from '../enums/film-rating';
import { FilmModel } from '../models/film-model';

export abstract class FilmRepository {
  public abstract get(
    filmId: number | undefined,
    title: string | undefined,
    relations: string[] | undefined,
  ): Promise<FilmModel | undefined>;

  public abstract update(
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
  ): Promise<boolean>;
}

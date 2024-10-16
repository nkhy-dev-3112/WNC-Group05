import { CategoryModel } from '../../../category/domain/models/category-model';
import { LanguageModel } from '../../../language/domain/models/language-model';
import { ActorModel } from '../../../actor/domain/models/actor-model';
import { FilmRating } from '../enums/film-rating';

export class FilmModel {
  public readonly filmId: number;

  public readonly title: string;

  public readonly description: string | undefined;

  public readonly releaseYear: number | undefined;

  public readonly languageId: number;

  public readonly originalLanguageId: number | undefined;

  public readonly rentalDuration: number;

  public readonly rentalRate: number;

  public readonly length: number | undefined;

  public readonly replacementCost: number;

  public readonly rating: FilmRating | undefined;

  public readonly lastUpdate: Date;

  public readonly specialFeatures: string[] | undefined;

  public readonly fulltext: string | undefined;

  /** Relations */

  public readonly categories: CategoryModel[] | undefined;

  public readonly language: LanguageModel | undefined;

  public readonly orginalLanguage: LanguageModel | undefined;

  public readonly actors: ActorModel[] | undefined;

  constructor(
    filmId: number,
    title: string,
    description: string | undefined,
    releaseYear: number | undefined,
    languageId: number,
    originalLanguageId: number | undefined,
    rentalDuration: number,
    rentalRate: number,
    length: number | undefined,
    replacementCost: number,
    rating: FilmRating | undefined,
    lastUpdate: Date,
    specialFeatures: string[] | undefined,
    fulltext: string | undefined,
    categories: CategoryModel[] | undefined,
    language: LanguageModel | undefined,
    orginalLanguage: LanguageModel | undefined,
    actors: ActorModel[] | undefined,
  ) {
    this.filmId = filmId;
    this.title = title;
    this.description = description;
    this.releaseYear = releaseYear;
    this.languageId = languageId;
    this.originalLanguageId = originalLanguageId;
    this.rentalDuration = rentalDuration;
    this.rentalRate = rentalRate;
    this.length = length;
    this.replacementCost = replacementCost;
    this.rating = rating;
    this.lastUpdate = lastUpdate;
    this.specialFeatures = specialFeatures;
    this.fulltext = fulltext;
    this.categories = categories;
    this.language = language;
    this.orginalLanguage = orginalLanguage;
    this.actors = actors;
  }

  public toJson(): Record<string, any> {
    return {
      film_id: this.filmId,
      title: this.title,
      description: this.description,
      release_year: this.releaseYear,
      language_id: this.languageId,
      original_language_id: this.originalLanguageId,
      rental_duration: this.rentalDuration,
      rental_rate: this.rentalRate,
      length: this.length,
      replacement_cost: this.replacementCost,
      rating: this.rating,
      last_update: this.lastUpdate,
      special_features: this.specialFeatures,
      fulltext: this.fulltext,
      categories: this.categories?.map((cat) => cat?.toJson()),
      language: this.language?.toJson(),
      original_language: this.orginalLanguage?.toJson(),
      actors: this.actors?.map((actor) => actor?.toJson()),
    };
  }
}

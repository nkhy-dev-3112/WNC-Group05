import { FilmRating } from '../enums/film-rating';
import { ApiProperty } from '@nestjs/swagger';

export class FilmModel {
  @ApiProperty({
    name: 'film_id',
    example: 1,
    description: 'Unique identifier for the film',
  })
  public readonly filmId: number;

  @ApiProperty({
    name: 'title',
    example: 'Inception',
    description: 'Title of the film',
  })
  public readonly title: string;

  @ApiProperty({
    name: 'description',
    example: 'A mind-bending thriller',
    required: false,
    description: 'Short description of the film',
  })
  public readonly description: string | undefined;

  @ApiProperty({
    name: 'release_year',
    example: 2010,
    required: false,
    description: 'Year the film was released',
  })
  public readonly releaseYear: number | undefined;

  @ApiProperty({
    name: 'language_id',
    example: 1,
    description: 'Language ID for the primary language of the film',
  })
  public readonly languageId: number;

  @ApiProperty({
    name: 'original_language_id',
    example: 2,
    required: false,
    description: 'ID of the original language, if applicable',
  })
  public readonly originalLanguageId: number | undefined;

  @ApiProperty({
    name: 'rental_duration',
    example: 3,
    description: 'Duration of the film rental in days',
  })
  public readonly rentalDuration: number;

  @ApiProperty({
    name: 'rental_rate',
    example: 9.99,
    description: 'Rate charged for renting the film',
  })
  public readonly rentalRate: number;

  @ApiProperty({
    name: 'length',
    example: 148,
    required: false,
    description: 'Length of the film in minutes',
  })
  public readonly length: number | undefined;

  @ApiProperty({
    name: 'replacement_cost',
    example: 20.0,
    description: 'Cost to replace the film if damaged',
  })
  public readonly replacementCost: number;

  @ApiProperty({
    name: 'rating',
    example: 'PG-13',
    enum: FilmRating,
    required: false,
    description: 'Rating of the film',
  })
  public readonly rating: FilmRating | undefined;

  @ApiProperty({
    name: 'last_update',
    example: new Date(),
    description: 'Date of the last update to the film record',
  })
  public readonly lastUpdate: Date;

  @ApiProperty({
    name: 'special_features',
    example: ['Deleted scenes', 'Behind the scenes'],
    required: false,
    description: 'Special features included with the film',
  })
  public readonly specialFeatures: string[] | undefined;

  @ApiProperty({
    name: 'fulltext',
    example: 'Inception full-text search data',
    required: false,
    description: 'Full-text search information',
  })
  public readonly fulltext: string | undefined;

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
    };
  }
}

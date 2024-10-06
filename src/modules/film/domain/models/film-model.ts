import { ApiProperty } from '@nestjs/swagger';

export class FilmModel {
  @ApiProperty({ name: 'film_id' })
  public readonly filmId: number;

  @ApiProperty({ name: 'title' })
  public readonly title: string;

  @ApiProperty({ name: 'description' })
  public readonly description: string | undefined;

  @ApiProperty({ name: 'release_year' })
  public readonly releaseYear: number | undefined;

  @ApiProperty({ name: 'language_id' })
  public readonly languageId: number;

  @ApiProperty({ name: 'original_language_id' })
  public readonly originalLanguageId: number | undefined;

  @ApiProperty({ name: 'rental_duration' })
  public readonly rentalDuration: number;

  @ApiProperty({ name: 'rental_rate' })
  public readonly rentalRate: number;

  @ApiProperty({ name: 'length' })
  public readonly length: number | undefined;

  @ApiProperty({ name: 'replacement_cost' })
  public readonly replacementCost: number;

  @ApiProperty({ name: 'rating' })
  public readonly rating: string | undefined;

  @ApiProperty({ name: 'last_update' })
  public readonly lastUpdate: Date;

  @ApiProperty({ name: 'special_features' })
  public readonly specialFeatures: string | undefined;

  @ApiProperty({ name: 'fulltext' })
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
    rating: string | undefined,
    lastUpdate: Date,
    specialFeatures: string | undefined,
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

import { ApiProperty } from '@nestjs/swagger';

export class FilmCategoryModel {
  @ApiProperty({
    name: 'film_id',
    example: 1,
    description: 'Unique identifier for the film',
  })
  public readonly filmId: number;

  @ApiProperty({
    name: 'category_id',
    example: 10,
    description: 'Unique identifier for the category',
  })
  public readonly categoryId: number;

  @ApiProperty({
    name: 'last_update',
    example: new Date(),
    description:
      'Timestamp of the last update for the film-category relationship',
  })
  public readonly lastUpdate: Date;

  constructor(categoryId: number, filmId: number, lastUpdate: Date) {
    this.filmId = filmId;
    this.categoryId = categoryId;
    this.lastUpdate = lastUpdate;
  }

  public toJson(): Record<string, any> {
    return {
      categort_id: this.categoryId,
      film_id: this.filmId,
      last_update: this.lastUpdate,
    };
  }
}

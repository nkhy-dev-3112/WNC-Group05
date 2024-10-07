import { ApiProperty } from '@nestjs/swagger';

export class FilmCategoryModel {
  @ApiProperty({ name: 'film_id' })
  public readonly filmId: number;

  @ApiProperty({ name: 'category_id' })
  public readonly categoryId: number;

  @ApiProperty({ name: 'last_update' })
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

export class FilmCategoryModel {
  public readonly filmId: number;

  public readonly categoryId: number;

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

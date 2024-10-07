import { Column, Entity, PrimaryColumn } from 'typeorm';
import { FilmCategoryModel } from '../../../domain/models/film-category-model';

@Entity('film_category')
export class FilmCategoryEntity {
  @PrimaryColumn()
  film_id!: number;

  @PrimaryColumn()
  category_id!: number;

  @Column()
  last_update!: Date;

  public toModel(): FilmCategoryModel {
    return new FilmCategoryModel(
      this.film_id,
      this.category_id,
      this.last_update,
    );
  }
}

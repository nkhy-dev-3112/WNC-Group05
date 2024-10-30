import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm';
import { CategoryModel } from '../../../domain/models/category-model';
import { FilmEntity } from '../../../../film/data/datasources/entities/film-entity';

@Entity('category')
export class CategoryEntity {
  @PrimaryColumn({ name: 'category_id' })
  category_id!: number;

  @Column({ type: 'varchar', length: 20, name: 'name' })
  name!: string;

  @Column({ type: 'date', name: 'last_update' })
  last_update: Date;

  @ManyToMany(() => FilmEntity, (film) => film.categories)
  films?: FilmEntity[];

  public toModel(): CategoryModel {
    return new CategoryModel(
      this.category_id,
      this.name,
      this.last_update,
      this.films?.map((film) => film?.toModel()),
    );
  }
}

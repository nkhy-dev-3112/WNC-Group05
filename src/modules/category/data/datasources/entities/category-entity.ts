import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { CategoryModel } from '../../../domain/models/category-model';
import { FilmEntity } from '../../../../film/data/datasources/entities/film-entity';

@Entity('language')
export class CategoryEntity {
  @PrimaryGeneratedColumn({ name: 'category_id' })
  category_id!: number;

  @Column({ type: 'varchar', length: 20, name: 'name' })
  name!: string;

  @Column({ type: 'date', name: 'last_update' })
  last_update: Date;

  @ManyToMany(() => FilmEntity, (film) => film.language)
  films?: FilmEntity[];

  public toModel(): CategoryModel {
    return new CategoryModel(this.category_id, this.name, this.last_update);
  }
}

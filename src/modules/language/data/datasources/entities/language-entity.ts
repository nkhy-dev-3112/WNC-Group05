import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany, // Import OneToMany
} from 'typeorm';
import { LanguageModel } from '../../../domain/models/language-model';
import { FilmEntity } from '../../../../film/data/datasources/entities/film-entity';

@Entity('language')
export class LanguageEntity {
  @PrimaryGeneratedColumn({ name: 'language_id' })
  language_id!: number;

  @Column({ type: 'varchar', length: 20, name: 'name' })
  name!: string;

  @Column({ type: 'date', name: 'last_update' })
  last_update: Date;

  @OneToMany(() => FilmEntity, (film) => film.language)
  films!: FilmEntity[];

  public toModel(): LanguageModel {
    return new LanguageModel(this.language_id, this.name, this.last_update);
  }
}

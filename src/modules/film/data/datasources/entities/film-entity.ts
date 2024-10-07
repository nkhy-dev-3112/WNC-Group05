import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FilmModel } from '../../../domain/models/film-model';
import { ActorEntity } from '../../../../actor/data/datasource/entities/actor-entity';
import { FilmRating } from '../../../domain/enums/film-rating';
import { LanguageEntity } from '../../../../language/data/datasources/entities/language-entity';
import { CategoryEntity } from '../../../../category/data/datasources/entities/category-entity';

@Entity('film')
export class FilmEntity {
  @PrimaryGeneratedColumn()
  film_id!: number;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({ type: 'int', nullable: true })
  release_year?: number;

  @Column({ type: 'int' })
  language_id!: number;

  @Column({ type: 'int', nullable: true })
  original_language_id?: number;

  @Column({ type: 'int', default: 3 })
  rental_duration!: number;

  @Column({ type: 'numeric', precision: 4, scale: 2, default: 4.99 })
  rental_rate!: number;

  @Column({ type: 'int', nullable: true })
  length?: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 19.99 })
  replacement_cost!: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  rating?: FilmRating;

  @Column({ type: 'timestamp', default: () => 'now()' })
  last_update!: Date;

  @Column({ type: 'text', nullable: true })
  special_features?: string[];

  @Column({ type: 'tsvector', nullable: true, select: false })
  fulltext?: string;

  /** Relations */

  @ManyToMany(() => ActorEntity, (actor) => actor.films)
  @JoinTable({
    name: 'film_actor',
    joinColumn: {
      name: 'film_id',
      referencedColumnName: 'film_id',
    },
    inverseJoinColumn: {
      name: 'actor_id',
      referencedColumnName: 'actor_id',
    },
  })
  actors!: ActorEntity[];

  @ManyToMany(() => CategoryEntity, (category) => category.films)
  @JoinTable({
    name: 'film_category',
    joinColumn: {
      name: 'film_id',
      referencedColumnName: 'film_id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'category_id',
    },
  })
  categories?: CategoryEntity[];

  @OneToOne(() => LanguageEntity)
  @JoinColumn({ name: 'language_id' })
  language!: LanguageEntity;

  @OneToOne(() => LanguageEntity)
  @JoinColumn({ name: 'original_language_id' })
  original_language!: LanguageEntity;

  public toModel(): FilmModel {
    return new FilmModel(
      this.film_id,
      this.title,
      this.description,
      this.release_year,
      this.language_id,
      this.original_language_id,
      this.rental_duration,
      this.rental_rate,
      this.length,
      this.replacement_cost,
      this.rating,
      this.last_update,
      this.special_features,
      this.fulltext,
      this.categories?.map((cat) => cat?.toModel()),
      this.language?.toModel(),
      this.original_language?.toModel(),
    );
  }
}

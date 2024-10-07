import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { ActorModel } from '../../../domain/models/actor-model';
import { FilmEntity } from '../../../../film/data/datasources/entities/film-entity';

@Entity('actor')
export class ActorEntity {
  @PrimaryColumn()
  actor_id!: number;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column()
  last_update!: Date;

  @ManyToMany(() => FilmEntity, (film) => film.actors)
  films?: FilmEntity[];

  public toModel(): ActorModel {
    return new ActorModel(
      this.actor_id,
      this.first_name,
      this.last_name,
      this.last_update,
      this.films?.map((film) => film?.toModel()),
    );
  }
}

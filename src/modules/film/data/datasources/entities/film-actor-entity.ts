import { Column, Entity, PrimaryColumn } from 'typeorm';
import { FilmActorModel } from '../../../domain/models/film-actor-model';

@Entity('film_actor')
export class FilmActorEntity {
  @PrimaryColumn()
  actor_id!: number;

  @PrimaryColumn()
  film_id!: number;

  @Column()
  last_update!: Date;

  public toModel(): FilmActorModel {
    return new FilmActorModel(this.actor_id, this.film_id, this.last_update);
  }
}

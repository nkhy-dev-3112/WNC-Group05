import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ActorModel } from '../../../domain/models/actor-model';

@Entity('actor')
export class ActorEntity {
  @PrimaryColumn()
  actor_id!: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  last_update: Date;

  public toModel(): ActorModel {
    return new ActorModel(
      this.actor_id,
      this.first_name,
      this.last_name,
      this.last_update,
    );
  }
}

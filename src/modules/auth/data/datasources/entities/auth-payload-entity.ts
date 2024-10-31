import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { AuthPayloadModel } from '../../../domain/models/auth-payload-model';

@Entity('auth_payloads')
export default class AuthPayloadEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  user_id!: string;

  @CreateDateColumn()
  created_at!: Date;

  toModel(): AuthPayloadModel {
    return new AuthPayloadModel(this.id, this.user_id, this.created_at);
  }
}

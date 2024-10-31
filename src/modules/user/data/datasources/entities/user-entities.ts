import { Column, Entity, PrimaryColumn } from 'typeorm';
import { UserModel } from '../../../domain/models/user-model';

@Entity('users')
export class UserEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;

  public toModel(): UserModel {
    return new UserModel(
      this.id,
      this.email,
      this.password,
      this.created_at,
      this.updated_at,
    );
  }
}

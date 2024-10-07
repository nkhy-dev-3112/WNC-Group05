import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { LanguageModel } from '../../../domain/models/language-model';

@Entity('language') // Assuming the table name is 'languages'
export class LanguageEntity {
  @PrimaryGeneratedColumn({ name: 'language_id' })
  language_id!: number;

  @Column({ type: 'varchar', length: 20, name: 'name' })
  name!: string;

  @Column({ type: 'date', name: 'last_update' })
  last_update: Date;

  public toModel(): LanguageModel {
    return new LanguageModel(this.language_id, this.name, this.last_update);
  }
}

import { Injectable } from '@nestjs/common';
import { LanguageEntity } from './entities/language-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { LanguageModel } from '../../domain/models/language-model';

@Injectable()
export class LanguageDatasource {
  constructor(
    @InjectRepository(LanguageEntity)
    private readonly languageRepository: Repository<LanguageEntity>,
  ) {}

  public async create(language: LanguageModel): Promise<void> {
    const entity = new LanguageEntity();

    entity.language_id = language.languageId;
    entity.name = language.name;
    entity.last_update = language.lastUpdate;

    await this.languageRepository.insert(entity);
  }

  public async get(
    languageId: number | undefined,
    name: string | undefined,
  ): Promise<LanguageModel | undefined> {
    const condition: FindOptionsWhere<LanguageEntity> = {};

    if (languageId) {
      condition['language_id'] = languageId;
    }

    if (name) {
      condition['name'] = name;
    }

    return (
      await this.languageRepository.findOne({
        where: condition,
      })
    )?.toModel();
  }

  public async update(
    language: LanguageModel,
    name: string | undefined,
    lastUpdate: Date | undefined,
  ): Promise<boolean> {
    const data = {
      ...(name !== undefined && { name: name }),
      ...(lastUpdate !== undefined && { last_update: lastUpdate }),
    };

    if (Object.keys(data).length > 0) {
      await this.languageRepository.update(language.languageId, {
        ...data,
      });
      return true;
    }
    return false;
  }

  public async delete(languageId: number): Promise<void> {
    await this.languageRepository.delete(languageId);
  }

  public async getMaxId(): Promise<number> {
    return (await this.languageRepository.maximum('language_id')) || 0;
  }
}

import { Injectable } from '@nestjs/common';
import { LanguageRepository } from '../../domain/repositories/language-repository';
import { LanguageDatasource } from '../datasources/language-datasource';
import { LanguageModel } from '../../domain/models/language-model';

@Injectable()
export class LanguageRepositoryImpl extends LanguageRepository {
  constructor(private readonly languageDatasource: LanguageDatasource) {
    super();
  }

  public async create(language: LanguageModel): Promise<void> {
    await this.languageDatasource.create(language);
  }
  public async get(
    languageId: number | undefined,
    name: string | undefined,
  ): Promise<LanguageModel | undefined> {
    return this.languageDatasource.get(languageId, name);
  }
  public async update(
    language: LanguageModel,
    name: string | undefined,
    lastUpdate: Date | undefined,
  ): Promise<boolean> {
    return this.languageDatasource.update(language, name, lastUpdate);
  }
  public async delete(languageId: number): Promise<void> {
    await this.languageDatasource.delete(languageId);
  }
  public async getMaxId(): Promise<number> {
    return this.languageDatasource.getMaxId();
  }
}

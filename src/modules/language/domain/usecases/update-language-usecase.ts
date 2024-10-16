import { Injectable } from '@nestjs/common';
import { LanguageRepository } from '../repositories/language-repository';
import { LanguageModel } from '../models/language-model';

@Injectable()
export class UpdateLanguageUsecase {
  constructor(private readonly languageRepository: LanguageRepository) {}

  public async call(
    language: LanguageModel,
    name: string,
    lastUpdate: Date,
  ): Promise<boolean> {
    return await this.languageRepository.update(language, name, lastUpdate);
  }
}

import { Injectable } from '@nestjs/common';
import { LanguageRepository } from '../repositories/language-repository';
import { LanguageModel } from '../models/language-model';

@Injectable()
export class CreateLanguageUsecase {
  constructor(private readonly languageRepository: LanguageRepository) {}

  public async call(name: string): Promise<LanguageModel> {
    const now = new Date();
    const maxLanguageId = await this.languageRepository.getMaxId();

    const language = new LanguageModel(maxLanguageId + 1, name, now);
    await this.languageRepository.create(language);
    console.log(language.toJson());
    return language;
  }
}

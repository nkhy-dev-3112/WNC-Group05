import { Injectable } from '@nestjs/common';
import { LanguageRepository } from '../repositories/language-repository';
import { LanguageModel } from '../models/language-model';

@Injectable()
export class GetLanguageUsecase {
  constructor(private readonly languageRepository: LanguageRepository) {}

  public async call(
    languageId: number | undefined,
    name: string | undefined,
  ): Promise<LanguageModel | undefined> {
    return await this.languageRepository.get(languageId, name);
  }
}

import { Injectable } from '@nestjs/common';
import { LanguageRepository } from '../repositories/language-repository';

@Injectable()
export class UpdateLanguageUsecase {
  constructor(private readonly languageRepository: LanguageRepository) {}

  public async call(
    languageId: number,
    name: string,
    lastUpdate: Date,
  ): Promise<boolean> {
    return await this.languageRepository.update(languageId, name, lastUpdate);
  }
}

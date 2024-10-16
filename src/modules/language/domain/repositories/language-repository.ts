import { LanguageModel } from '../models/language-model';

export abstract class LanguageRepository {
  public abstract create(language: LanguageModel): Promise<void>;
  public abstract get(
    languageId: number | undefined,
    name: string | undefined,
  ): Promise<LanguageModel | undefined>;
  public abstract update(
    language: LanguageModel,
    name: string | undefined,
    lastUpdate: Date | undefined,
  ): Promise<boolean>;
  public abstract delete(languageId: number): Promise<void>;
  public abstract getMaxId(): Promise<number>;
}

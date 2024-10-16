export class LanguageModel {
  languageId: number;

  name: string;

  lastUpdate: Date;

  constructor(languageId: number, name: string, lastUpdate: Date) {
    this.languageId = languageId;
    this.name = name;
    this.lastUpdate = lastUpdate;
  }

  public toJson(): Record<string, any> {
    return {
      language_id: this.languageId,
      name: this.name,
      last_update: this.lastUpdate,
    };
  }
}

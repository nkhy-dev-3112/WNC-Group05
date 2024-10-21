import { ApiProperty } from '@nestjs/swagger';

export class LanguageModel {
  @ApiProperty({
    name: 'language_id',
    example: 1,
    description: 'Unique identifier for the language',
  })
  public languageId: number;

  @ApiProperty({
    name: 'name',
    example: 'English',
    description: 'Name of the language',
  })
  public name: string;

  @ApiProperty({
    name: 'last_update',
    example: '2024-10-21T10:00:00Z',
    description: 'Timestamp of the last update for the language record',
  })
  public lastUpdate: Date;

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

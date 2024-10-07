import { ApiProperty } from '@nestjs/swagger';

export class CategoryModel {
  @ApiProperty({ name: 'language_id' })
  categoryId: number;

  @ApiProperty({ name: 'name' })
  name: string;

  @ApiProperty({ name: 'last_update' })
  lastUpdate: Date;

  constructor(categoryId: number, name: string, lastUpdate: Date) {
    this.categoryId = categoryId;
    this.name = name;
    this.lastUpdate = lastUpdate;
  }

  public toJson(): Record<string, any> {
    return {
      category_id: this.categoryId,
      name: this.name,
      last_update: this.lastUpdate,
    };
  }
}

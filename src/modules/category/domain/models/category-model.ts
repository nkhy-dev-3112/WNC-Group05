import { ApiProperty } from '@nestjs/swagger';

export class CategoryModel {
  @ApiProperty({
    name: 'category_id',
    example: 1,
    description: 'Unique identifier for the category',
  })
  categoryId: number;

  @ApiProperty({
    name: 'name',
    example: 'Action',
    description: 'Name of the category or genre',
  })
  name: string;

  @ApiProperty({
    name: 'last_update',
    example: new Date(),
    description: 'Timestamp of the last update for the category record',
  })
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

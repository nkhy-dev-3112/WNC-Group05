import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilmModel } from '../../../film/domain/models/film-model';

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

  /** Relations */

  @ApiPropertyOptional({
    name: 'films',
    type: [FilmModel],
    description: 'List of films the actor has this category',
  })
  public readonly films: FilmModel[];

  constructor(
    categoryId: number,
    name: string,
    lastUpdate: Date,
    films: FilmModel[] | undefined,
  ) {
    this.categoryId = categoryId;
    this.name = name;
    this.lastUpdate = lastUpdate;
    this.films = films;
  }

  public toJson(): Record<string, any> {
    return {
      category_id: this.categoryId,
      name: this.name,
      last_update: this.lastUpdate,
      films: this?.films.map((film) => film.toJson()),
    };
  }
}

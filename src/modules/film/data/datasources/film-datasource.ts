import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmEntity } from './entities/film-entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { FilmModel } from '../../domain/models/film-model';
import { FilmRating } from '../../domain/enums/film-rating';

@Injectable()
export class FilmDatasource {
  constructor(
    @InjectRepository(FilmEntity)
    private readonly filmRepository: Repository<FilmEntity>,
  ) {}

  public async get(
    filmId: number | undefined,
    title: string | undefined,
    relations: string[] | undefined,
  ): Promise<FilmModel | undefined> {
    const condition: FindOptionsWhere<FilmEntity> = {};

    if (filmId) {
      condition['film_id'] = filmId;
    }

    if (title) {
      condition['title'] = title;
    }

    const options = {
      where: condition,
    };

    if (relations !== undefined) {
      options['relations'] = relations;
    }

    return (await this.filmRepository.findOne(options))?.toModel();
  }

  public async update(
    film: FilmModel,
    title: string | undefined,
    description: string | undefined,
    releaseYear: number | undefined,
    languageId: number | undefined,
    originalLanguageId: number | undefined,
    rentalDuration: number,
    rentalRate: number | undefined,
    length: number | undefined,
    replacementCost: number | undefined,
    rating: FilmRating | undefined,
    specialFeatures: string[] | undefined,
    fullText: string | undefined,
    lastUpdate: Date | undefined,
  ): Promise<boolean> {
    const data = {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(releaseYear !== undefined && { release_year: releaseYear }),
      ...(languageId !== undefined && { language_id: languageId }),
      ...(originalLanguageId !== undefined && {
        original_language_id: originalLanguageId,
      }),
      ...(rentalDuration !== undefined && { rental_duration: rentalDuration }),
      ...(rentalRate !== undefined && { rental_rate: rentalRate }),
      ...(length !== undefined && { length: length }),
      ...(replacementCost !== undefined && {
        replacement_cost: replacementCost,
      }),
      ...(rating !== undefined && { rating }),
      ...(specialFeatures !== undefined && {
        special_features: specialFeatures,
      }),
      ...(fullText !== undefined && { full_text: fullText }),
      ...(lastUpdate !== undefined && { last_update: lastUpdate }),
    };

    if (Object.keys(data).length > 0) {
      await this.filmRepository.update(film.filmId, {
        ...data,
      });
      return true;
    }
    return false;
  }
}

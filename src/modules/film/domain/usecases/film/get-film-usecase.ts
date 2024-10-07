import { Injectable } from '@nestjs/common';
import { FilmRepository } from '../../repositories/film-repository';

@Injectable()
export class GetFilmUsecase {
  constructor(private readonly filmRepository: FilmRepository) {}
  public async call(
    filmId: number | undefined,
    title: string | undefined,
    relations: string[] | undefined,
  ) {
    return this.filmRepository.get(filmId, title, relations);
  }
}

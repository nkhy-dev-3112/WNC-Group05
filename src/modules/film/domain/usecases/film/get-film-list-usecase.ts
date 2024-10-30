import { Injectable } from '@nestjs/common';
import { FilmRepository } from '../../repositories/film-repository';
import { FilmModel } from '../../models/film-model';

@Injectable()
export class GetFilmListUsecase {
  constructor(private readonly filmRepository: FilmRepository) {}

  public async call(): Promise<FilmModel[] | undefined> {
    return this.filmRepository.list();
  }
}

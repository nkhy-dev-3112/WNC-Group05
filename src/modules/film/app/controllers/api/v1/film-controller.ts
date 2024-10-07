import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetFilmUsecase } from '../../../../domain/usecases/film/get-film-usecase';
import { Response } from 'express';
import { GetFilmParamDto } from '../../../dtos/film-dto';

@ApiTags('Film')
@Controller({ path: 'api/film/v1/me' })
export class FilmController {
  constructor(private readonly getFilmUsecase: GetFilmUsecase) {}

  /**
   * Get by id
   */
  @Get('id/:film_id')
  async get(@Param() param: GetFilmParamDto, @Res() res: Response) {
    const film = await this.getFilmUsecase.call(param.film_id, undefined, [
      'categories',
      'language',
      'original_language',
      'actors',
    ]);

    if (!film) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Film not found' });
      return;
    }

    res.json(film);
  }
}

import { Controller, Get, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FilmModel } from '../../../../domain/models/film-model';
import { ErrorCode } from '../../../../../../exceptions/error-code';
import { LogicalException } from '../../../../../../exceptions/logical-exception';
import { GetFilmListUsecase } from '../../../../domain/usecases/film/get-film-list-usecase';
import { AuthClientGuard } from '../../../../../auth/guards/auth-client-guard';

@ApiTags('Film')
@UseGuards(AuthClientGuard)
@Controller({ path: 'api/filmB' })
export class FilmController {
  constructor(private readonly getFilmListUsecase: GetFilmListUsecase) {}

  /**
   * Get actor list
   */
  @ApiOperation({ summary: 'Get a list of all films' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Film list found',
    type: [FilmModel],
  })
  @Get('/')
  async getList(@Res() res: Response) {
    const films = await this.getFilmListUsecase.call();

    if (!films) {
      throw new LogicalException(
        ErrorCode.FILM_NOT_FOUND,
        'Actor list not found',
        undefined,
      );
    }

    res.status(HttpStatus.OK).json(films?.map((film) => film.toJson()));
  }
}

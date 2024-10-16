import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { GetFilmUsecase } from '../../../../domain/usecases/film/get-film-usecase';
import { Response } from 'express';
import {
  CreateFilmActorParamDto,
  GetFilmParamDto,
  UpdateFilmDto,
} from '../../../dtos/film-dto';
import { UpdateFilmUsecase } from '../../../../domain/usecases/film/update-film-usecase';
import { GetLanguageUsecase } from '../../../../../language/domain/usecases/get-language-usecase';
import { GetActorUsecase } from '../../../../../actor/domain/usecases/get-actor-usecase';
import { CheckFilmActorExistUsecase } from '../../../../domain/usecases/film-actor/check-film-actor-exist-usecase';
import { FilmActorModel } from '../../../../domain/models/film-actor-model';
import { CreateFilmActorUsecase } from '../../../../domain/usecases/film-actor/create-film-actor-usecase';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Film')
@Controller({ path: 'api/user/v1/film' })
export class FilmController {
  constructor(
    private readonly getFilmUsecase: GetFilmUsecase,
    private readonly getActorUsecase: GetActorUsecase,
    private readonly updateFilmUsecase: UpdateFilmUsecase,
    private readonly getLanguageUsecase: GetLanguageUsecase,
    private readonly checkFilmActorExistUsecase: CheckFilmActorExistUsecase,
    private readonly createFilmActorUsecase: CreateFilmActorUsecase,
  ) {}

  /**
   * Get by id
   */
  @ApiOperation({ summary: 'Get a film by its ID' })
  @ApiResponse({
    status: 200,
    description: 'Film found',
    example: { id: 1, title: 'The Shawshank Redemption', release_year: 1994 },
  })
  @ApiResponse({
    status: 404,
    description: 'Film not found',
    example: { message: 'Film not found' },
  })
  @ApiParam({
    name: 'film_id',
    description: 'The ID of the film to retrieve',
    required: true,
    example: 1,
  })
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

  /**
   * Update film
   */
  @ApiOperation({ summary: 'Update an existing film' })
  @ApiResponse({
    status: 200,
    description: 'Film updated successfully',
    example: true,
  })
  @ApiResponse({
    status: 404,
    description: 'Film not found',
    example: { message: 'Film not found' },
  })
  @ApiResponse({
    status: 404,
    description: 'Language not found',
    example: { message: 'Language not found' },
  })
  @ApiResponse({
    status: 404,
    description: 'Original language not found',
    example: { message: 'Original language not found' },
  })
  @ApiParam({
    name: 'film_id',
    description: 'The ID of the film to update',
    required: true,
    example: 1,
  })
  @ApiBody({
    description: 'Film update details',
    type: UpdateFilmDto,
    schema: {
      example: {
        title: 'The Shawshank Redemption',
        release_year: 1994,
      },
    },
  })
  @Put('id/:film_id')
  async update(
    @Param() param: GetFilmParamDto,
    @Body() body: UpdateFilmDto,
    @Res() res: Response,
  ) {
    const film = await this.getFilmUsecase.call(param.film_id, undefined, [
      'categories',
      'language',
      'original_language',
      'actors',
    ]);

    if (!film) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Film not found' });
    }

    if (!body.language_id) {
      const language = await this.getLanguageUsecase.call(
        body.language_id,
        undefined,
      );

      if (!language) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Language not found' });
      }
    }

    if (!body.original_language_id) {
      const originalLanguage = await this.getLanguageUsecase.call(
        body.language_id,
        undefined,
      );

      if (!originalLanguage) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Original language not found' });
      }
    }

    await this.updateFilmUsecase.call(
      film,
      body.title,
      body.description,
      body.release_year,
      body.language_id,
      body.original_language_id,
      body.rental_duration,
      body.rental_rate,
      body.length,
      body.replacement_cost,
      body.rating,
      body.special_features,
      body.fulltext,
    );
    res.status(HttpStatus.OK).json(true);
  }

  /**
   * Create film actor
   */
  @ApiOperation({ summary: 'Create a new film actor association' })
  @ApiResponse({
    status: 201,
    description: 'Film actor created successfully',
    example: { id: 1, film_id: 1, actor_id: 1 },
  })
  @ApiResponse({
    status: 404,
    description: 'Actor not found',
    example: { message: 'Actor not found' },
  })
  @ApiResponse({
    status: 404,
    description: 'Film not found',
    example: { message: 'Film not found' },
  })
  @ApiResponse({
    status: 404,
    description: 'Film actor not found',
    example: { message: 'Film actor not found' },
  })
  @ApiParam({
    name: 'film_id',
    description: 'The ID of the film',
    required: true,
    example: 1,
  })
  @ApiParam({
    name: 'actor_id',
    description: 'The ID of the actor',
    required: true,
    example: 1,
  })
  @Post('id/:film_id/actor/:actor_id')
  async createFilmActor(
    @Param() param: CreateFilmActorParamDto,
    @Res() res: Response,
  ) {
    const [actor, film, filmActor] = await Promise.all([
      this.getActorUsecase.call(
        param.actor_id,
        undefined,
        undefined,
        undefined,
      ),
      this.getFilmUsecase.call(param.film_id, undefined, undefined),
      this.checkFilmActorExistUsecase.call(
        new FilmActorModel(param.actor_id, param.film_id, new Date()),
      ),
    ]);

    if (!actor) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Actor not found' });
    }
    if (!film) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Film not found' });
    }
    if (!filmActor) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Film not found' });
    }

    await this.createFilmActorUsecase.call(filmActor);
    res.status(HttpStatus.OK).json(filmActor.toJson());
  }
}

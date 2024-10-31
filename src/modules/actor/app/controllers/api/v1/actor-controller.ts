import { Controller, Get, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { GetActorListUsecase } from '../../../../domain/usecases/get-actor-list-usecase';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ActorModel } from '../../../../domain/models/actor-model';
import { LogicalException } from '../../../../../../exceptions/logical-exception';
import { ErrorCode } from '../../../../../../exceptions/error-code';
import { ErrorException } from '../../../../../../exceptions/error-exception';
import { JwtAuthGuard } from '../../../../../auth/jwt/jwt-auth-guard';

@ApiTags('Actor')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'api' })
export class ActorController {
  constructor(private readonly getActorListUsecase: GetActorListUsecase) {}

  /**
   * Get actor list
   */
  @ApiOperation({ summary: 'Get a list of all actors' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Actor list found',
    type: [ActorModel],
  })
  @Get('/actorA')
  async list(@Res() res: Response) {
    const actorList = await this.getActorListUsecase.call();

    if (!actorList) {
      throw new LogicalException(
        ErrorCode.ACTOR_NOT_FOUND,
        'Actor list not found',
        undefined,
      );
    }

    res.status(HttpStatus.OK).json(actorList?.map((actor) => actor.toJson()));
  }

  @ApiOperation({ summary: 'Get a list of all films from server B' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Film list found',
  })
  @Get('/filmA')
  async getFilm(@Res() res: Response) {
    try {
      const response = await fetch(
        `http://localhost:${process.env.APP_PORT_B}/api/filmB`,
        {
          method: 'GET',
          headers: {
            'x-client-id': process.env.SERVERB_CLIENT_ID,
            'x-client-secret': process.env.SERVERB_CLIENT_SECRET,
          },
        },
      );

      if (response.status === HttpStatus.UNAUTHORIZED) {
        throw new ErrorException(
          ErrorCode.UNAUTHORIZED,
          'Can not access server B without identifying',
          undefined,
        );
      } else if (response.status === HttpStatus.BAD_REQUEST) {
        throw new ErrorException(
          ErrorCode.UNDEFINED_ERROR,
          `Can not access server B with status code ${response.status}`,
          undefined,
        );
      }

      const data = await response.json();

      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      throw new ErrorException(
        ErrorCode.UNDEFINED_ERROR,
        error.message,
        undefined,
      );
    }
  }
}

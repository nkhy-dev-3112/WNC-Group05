import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

import { GetActorListUsecase } from '../../../../domain/usecases/get-actor-list-usecase';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ActorModel } from '../../../../domain/models/actor-model';
import { LogicalException } from '../../../../../../exceptions/logical-exception';
import { ErrorCode } from '../../../../../../exceptions/error-code';

@ApiTags('Actor')
@Controller({ path: 'api/actor/v1/me' })
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
  @Get('/')
  async getList(@Res() res: Response) {
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
}

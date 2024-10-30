import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { GetActorUsecase } from '../../../../domain/usecases/get-actor-usecase';
import { Response } from 'express';
import {
  CreateActorDto,
  GetActorParamDto,
  UpdateActorDto,
} from '../../../dtos/actor-dto';
import { GetActorListUsecase } from '../../../../domain/usecases/get-actor-list-usecase';
import { UpdateActorUsecase } from '../../../../domain/usecases/update-actor-usecase';
import { CreateActorUsecase } from '../../../../domain/usecases/create-actor-usecase';
import { DeleteActorUsecase } from '../../../../domain/usecases/delete-actor-usecase';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { ActorModel } from '../../../../domain/models/actor-model';
import { LogicalException } from '../../../../../../exceptions/logical-exception';
import { ErrorCode } from '../../../../../../exceptions/error-code';

@ApiTags('Actor')
@Controller({ path: 'api/actor/v1/me' })
export class ActorController {
  constructor(
    private readonly getActorUsecase: GetActorUsecase,
    private readonly getActorListUsecase: GetActorListUsecase,
    private readonly updateActorUsecase: UpdateActorUsecase,
    private readonly createActorUsecase: CreateActorUsecase,
    private readonly deleteActorUsecase: DeleteActorUsecase,
  ) {}

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

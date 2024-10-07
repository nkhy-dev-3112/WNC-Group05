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
import { ApiTags } from '@nestjs/swagger';
import { DeleteFilmActorByActorIdUsecase } from '../../../../../film/domain/usecases/film-actor/delete-film-actor-by-actor-id-usecase';
import { GetFilmActorByActorIdUsecase } from '../../../../../film/domain/usecases/film-actor/get-film-actor-by-actor-id-usecase';

@ApiTags('Actor')
@Controller({ path: 'api/actor/v1/me' })
export class ActorController {
  constructor(
    private readonly getActorUsecase: GetActorUsecase,
    private readonly getActorListUsecase: GetActorListUsecase,
    private readonly updateActorUsecase: UpdateActorUsecase,
    private readonly createActorUsecase: CreateActorUsecase,
    private readonly deleteActorUsecase: DeleteActorUsecase,
    private readonly deleteFilmActorByActorIdUsecase: DeleteFilmActorByActorIdUsecase,
    private readonly getFilmActorByActorIdUsecase: GetFilmActorByActorIdUsecase,
  ) {}

  /**
   * Get by id
   */
  @Get('id/:actor_id')
  async get(@Param() param: GetActorParamDto, @Res() res: Response) {
    const actor = await this.getActorUsecase.call(
      param.actor_id,
      undefined,
      undefined,
      ['films'],
    );

    if (!actor) {
      res.status(400).json({ message: 'Actor not found' });
      return;
    }

    res.json(actor.toJson());
  }

  /**
   * Get actor list
   */

  @Get('/')
  async getList(@Res() res: Response) {
    const actorList = await this.getActorListUsecase.call();

    if (!actorList) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Actor list not found' });
      return;
    }

    res.status(HttpStatus.OK).json(actorList.map((actor) => actor.toJson()));
  }

  /**
   *  Update actor
   */
  @Put('id/:actor_id')
  async update(
    @Body() body: UpdateActorDto,
    @Param() param: GetActorParamDto,
    @Res() res: Response,
  ) {
    let actor = await this.getActorUsecase.call(
      param.actor_id,
      undefined,
      undefined,
      ['films'],
    );

    if (!actor) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'Actor not found' });
    }

    const result = await this.updateActorUsecase.call(
      actor,
      body.first_name,
      body.last_name,
    );
    res.status(HttpStatus.OK).json(result);
  }

  /**
   * Create actor
   */

  @Post('/')
  async create(@Body() body: CreateActorDto, @Res() res: Response) {
    const actor = await this.createActorUsecase.call(
      body.first_name,
      body.last_name,
    );
    res.status(HttpStatus.OK).json(actor.toJson());
  }

  /**
   * Delete actor
   */
  @Delete('id/:actor_id')
  async delete(@Param() param: GetActorParamDto, @Res() res: Response) {
    const actor = await this.getActorUsecase.call(
      param.actor_id,
      undefined,
      undefined,
      ['films'],
    );

    if (!actor) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'Actor not found' });
      return;
    }
    const result = await this.deleteActorUsecase.call(actor);
    res.status(HttpStatus.OK).json(result);
  }
}

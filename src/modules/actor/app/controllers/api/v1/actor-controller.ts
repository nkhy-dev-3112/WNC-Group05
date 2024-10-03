import { Controller, Get, Param, Res } from '@nestjs/common';
import { GetActorUsecase } from '../../../../domain/usecases/get-actor-usecase';
import { Response } from 'express';
import { GetActorParamDto } from '../../../dtos/actor-dto';

@Controller({ path: 'api/actor/v1/me' })
export class ActorController {
  constructor(private readonly getActorUsecase: GetActorUsecase) {}

  /**
   * Get by id
   */
  @Get('id/:actor_id')
  async get(@Param() param: GetActorParamDto, @Res() res: Response) {
    const actor = await this.getActorUsecase.call(param.actor_id);

    if (!actor) {
      res.status(400).json({ error: 'Actor not found' });
      return;
    }

    res.json(actor.toJson());
  }
}

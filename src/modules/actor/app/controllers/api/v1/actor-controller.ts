import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { GetActorUsecase } from '../../../../domain/usecases/get-actor-usecase';
import { Response } from 'express';
import {
  CreateActorDto,
  GetActorListQueryDto,
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
import { PageParams } from '../../../../../../core/models/page-params';
import { SortParams } from '../../../../../../core/models/sort-params';
import { DateFilterParams } from '../../../../../../core/models/date-filter-params';

@ApiTags('Actor')
@Controller({ path: 'api/user/v1/actor' })
export class ActorController {
  constructor(
    private readonly getActorUsecase: GetActorUsecase,
    private readonly getActorListUsecase: GetActorListUsecase,
    private readonly updateActorUsecase: UpdateActorUsecase,
    private readonly createActorUsecase: CreateActorUsecase,
    private readonly deleteActorUsecase: DeleteActorUsecase,
  ) {}

  /**
   * Get by id
   */
  @ApiOperation({ summary: 'Get an actor by their ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Actor found',
    type: ActorModel,
  })
  @ApiParam({
    name: 'actor_id',
    description: 'The ID of the actor',
    required: true,
  })
  @Get('id/:actor_id')
  async get(@Param() param: GetActorParamDto, @Res() res: Response) {
    const actor = await this.getActorUsecase.call(
      parseInt(param.actor_id),
      undefined,
      undefined,
      ['films'],
    );

    if (!actor) {
      throw new LogicalException(
        ErrorCode.ACTOR_NOT_FOUND,
        'Actor not found',
        undefined,
      );
    }

    res.json(actor.toJson());
  }

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
  async getList(@Query() query: GetActorListQueryDto, @Res() res: Response) {
    const pageParams = new PageParams(
      query.page,
      query.limit,
      query.need_total_count,
      query.only_count,
    );
    const sortParams = new SortParams(query.sort, query.type);
    const dateFilterParams = new DateFilterParams(
      new Date(query.from),
      query.to,
      query.column,
    );
    const actorList = await this.getActorListUsecase.call(
      pageParams,
      sortParams,
      dateFilterParams,
      undefined,
    );

    if (!actorList) {
      throw new LogicalException(
        ErrorCode.ACTOR_NOT_FOUND,
        'Actor list not found',
        undefined,
      );
    }

    res.status(HttpStatus.OK).json(actorList.toJson());
  }

  /**
   *  Update actor
   */
  @ApiOperation({ summary: 'Update an actor' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Actor updated successfully',
    example: true,
  })
  @ApiParam({
    name: 'actor_id',
    description: 'The ID of the actor',
    required: true,
  })
  @ApiBody({
    description: 'Actor update details',
    type: UpdateActorDto,
  })
  @Put('id/:actor_id')
  async update(
    @Body() body: UpdateActorDto,
    @Param() param: GetActorParamDto,
    @Res() res: Response,
  ) {
    const actor = await this.getActorUsecase.call(
      parseInt(param.actor_id),
      undefined,
      undefined,
      ['films'],
    );

    if (!actor) {
      throw new LogicalException(
        ErrorCode.ACTOR_NOT_FOUND,
        'Actor not found',
        undefined,
      );
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
  @ApiOperation({ summary: 'Create a new actor' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Actor created successfully',
    type: ActorModel,
  })
  @ApiBody({
    description: 'Actor details',
    type: CreateActorDto,
  })
  @Post('/')
  async create(@Body() body: CreateActorDto, @Res() res: Response) {
    const actor = await this.createActorUsecase.call(
      body.first_name,
      body.last_name,
    );
    res.status(HttpStatus.CREATED).json(actor.toJson());
  }

  /**
   * Delete actor
   */
  @ApiOperation({ summary: 'Delete an actor' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Actor deleted successfully',
    example: true,
  })
  @ApiParam({
    name: 'actor_id',
    description: 'The ID of the actor',
    required: true,
  })
  @Delete('id/:actor_id')
  async delete(@Param() param: GetActorParamDto, @Res() res: Response) {
    const actor = await this.getActorUsecase.call(
      parseInt(param.actor_id),
      undefined,
      undefined,
      ['films'],
    );

    if (!actor) {
      throw new LogicalException(
        ErrorCode.ACTOR_NOT_FOUND,
        'Actor not found',
        undefined,
      );
    }
    const result = await this.deleteActorUsecase.call(actor);
    res.status(HttpStatus.OK).json(result);
  }
}

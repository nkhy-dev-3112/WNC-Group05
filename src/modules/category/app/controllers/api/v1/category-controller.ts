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
import { ApiTags } from '@nestjs/swagger';
import { GetCategoryUsecase } from '../../../../domain/usecases/get-category-usecase';
import { UpdateCategoryUsecase } from '../../../../domain/usecases/update-category-usecase';
import { CreateCategoryUsecase } from '../../../../domain/usecases/create-category-usecase';
import {
  CreateCategoryDto,
  GetCategoryParamDto,
  UpdateCategoryDto,
} from '../../../dtos/category-dto';
import { Response } from 'express';

@ApiTags('Category')
@Controller({ path: 'api/user/v1/category' })
export class CategoryController {
  constructor(
    private readonly getCategoryUsecase: GetCategoryUsecase,
    private readonly updateCategoryUsecase: UpdateCategoryUsecase,
    private readonly createCategoryUsecase: CreateCategoryUsecase,
  ) {}

  @Post()
  async create(@Body() body: CreateCategoryDto, @Res() res: Response) {
    let category = await this.getCategoryUsecase.call(undefined, body.name);
    if (category) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'This category is already exists' });
      return;
    }
    category = await this.createCategoryUsecase.call(body.name);
    res.status(HttpStatus.CREATED).json(category.toJson());
  }

  @Get('id/:category_id')
  async get(@Param() param: GetCategoryParamDto, @Res() res: Response) {
    const category = await this.getCategoryUsecase.call(
      parseInt(param.category_id),
      undefined,
    );

    if (!category) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Category not found' });
      return;
    }

    res.json(category);
  }

  @Put('id/:category_id')
  async update(
    @Param() param: GetCategoryParamDto,
    @Body() body: UpdateCategoryDto,
    @Res() res: Response,
  ) {
    const category = await this.getCategoryUsecase.call(
      parseInt(param.category_id),
      undefined,
    );

    if (!category) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Category not found' });
      return;
    }

    await this.updateCategoryUsecase.call(category, body.name, new Date());
    res.status(HttpStatus.OK).json(true);
  }
}

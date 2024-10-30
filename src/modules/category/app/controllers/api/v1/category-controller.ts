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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetCategoryUsecase } from '../../../../domain/usecases/get-category-usecase';
import { UpdateCategoryUsecase } from '../../../../domain/usecases/update-category-usecase';
import { CreateCategoryUsecase } from '../../../../domain/usecases/create-category-usecase';
import {
  CreateCategoryDto,
  GetCategoryParamDto,
  UpdateCategoryDto,
} from '../../../dtos/category-dto';
import { Response } from 'express';
import { CategoryModel } from '../../../../domain/models/category-model';

@ApiTags('Category')
@Controller({ path: 'api/user/v1/category' })
export class CategoryController {
  constructor(
    private readonly getCategoryUsecase: GetCategoryUsecase,
    private readonly updateCategoryUsecase: UpdateCategoryUsecase,
    private readonly createCategoryUsecase: CreateCategoryUsecase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Category created successfully.',
    type: CategoryModel,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'This category already exists.',
    example: { message: 'This category already exists.' },
  })
  async create(@Body() body: CreateCategoryDto, @Res() res: Response) {
    let category = await this.getCategoryUsecase.call(
      undefined,
      body.name,
      undefined,
    );
    if (category) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'This category is already exists' });
      return;
    }
    category = await this.createCategoryUsecase.call(body.name);
    res.status(HttpStatus.CREATED).json(category.toJson());
  }

  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiParam({
    name: 'category_id',
    type: 'integer',
    description: 'Category ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Category found.',
    type: CategoryModel,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Category not found.',
    example: { message: 'Category not found' },
  })
  @Get('id/:category_id')
  async get(@Param() param: GetCategoryParamDto, @Res() res: Response) {
    const category = await this.getCategoryUsecase.call(
      param.category_id,
      undefined,
      ['films'],
    );

    if (!category) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Category not found' });
      return;
    }

    res.json(category.toJson());
  }

  @Put('id/:category_id')
  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiParam({
    name: 'category_id',
    type: 'integer',
    description: 'Category ID',
  })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Category updated successfully.',
    type: Boolean,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Category not found.',
    example: { message: 'Category not found' },
  })
  async update(
    @Param() param: GetCategoryParamDto,
    @Body() body: UpdateCategoryDto,
    @Res() res: Response,
  ) {
    const category = await this.getCategoryUsecase.call(
      param.category_id,
      undefined,
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

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
import { Response } from 'express';
import {
  CreateLanguageDto,
  GetLanguageParamDto,
  UpdateLanguageDto,
} from '../../../dtos/language-dto';
import { GetLanguageUsecase } from '../../../../domain/usecases/get-language-usecase';
import { UpdateLanguageUsecase } from '../../../../domain/usecases/update-language-usecase';
import { CreateLanguageUsecase } from '../../../../domain/usecases/create-language-usecase';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Language')
@Controller({ path: 'api/user/v1/language' })
export class LanguageController {
  constructor(
    private readonly getLanguageUsecase: GetLanguageUsecase,
    private readonly updateLanguageUsecase: UpdateLanguageUsecase,
    private readonly createLanguageUsecase: CreateLanguageUsecase,
  ) {}

  /**
   * Create language
   */
  @ApiOperation({ summary: 'Create a new language' })
  @ApiResponse({ status: 201, description: 'Language created successfully' })
  @ApiResponse({ status: 400, description: 'This language is already exists' })
  @Post()
  async create(@Body() body: CreateLanguageDto, @Res() res: Response) {
    let language = await this.getLanguageUsecase.call(undefined, body.name);
    if (language) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'This language is already exists' });
      return;
    }
    language = await this.createLanguageUsecase.call(body.name);
    res.status(HttpStatus.CREATED).json(language.toJson());
  }

  /**
   * Get by id
   */
  @ApiOperation({ summary: 'Get a language by its ID' })
  @ApiResponse({ status: 200, description: 'Language found' })
  @ApiResponse({ status: 400, description: 'Language not found' })
  @ApiParam({
    name: 'language_id',
    description: 'The ID of the language to retrieve',
    required: true,
  })
  @Get('id/:language_id')
  async get(@Param() param: GetLanguageParamDto, @Res() res: Response) {
    const language = await this.getLanguageUsecase.call(
      parseInt(param.language_id),
      undefined,
    );

    if (!language) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Language not found' });
      return;
    }

    res.json(language);
  }

  /**
   * Update language
   */
  @ApiOperation({ summary: 'Update an existing language' })
  @ApiResponse({ status: 200, description: 'Language updated successfully' })
  @ApiResponse({ status: 400, description: 'Language not found' })
  @ApiParam({
    name: 'language_id',
    description: 'The ID of the language to update',
    required: true,
  })
  @Put('id/:language_id')
  async update(
    @Param() param: GetLanguageParamDto,
    @Body() body: UpdateLanguageDto,
    @Res() res: Response,
  ) {
    const language = await this.getLanguageUsecase.call(
      parseInt(param.language_id),
      undefined,
    );

    if (!language) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Language not found' });
      return;
    }

    await this.updateLanguageUsecase.call(language, body.name, new Date());
    res.status(HttpStatus.OK).json(true);
  }
}

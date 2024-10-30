import { Controller, Get } from '@nestjs/common';
import { GetInformationUsecase } from '../../../../domain/usecases/get-infomation-usecase';
import { ApiTags } from '@nestjs/swagger';
import { ErrorException } from '../../../../../../exceptions/error-exception';
import { ErrorCode } from '../../../../../../exceptions/error-code';

@ApiTags('Welcome')
@Controller()
export class AppController {
  constructor(private readonly getInformationUsecase: GetInformationUsecase) {}

  /**
   *  Welcome
   */

  @Get()
  public getHello() {
    return this.getInformationUsecase.getHello();
  }
}

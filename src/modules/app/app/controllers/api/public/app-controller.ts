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

  /**
   * Demo error tracking
   */
  @Get('/debug-sentry')
  getError() {
    throw new ErrorException(
      ErrorCode.UNDEFINED_ERROR,
      'This is my first error',
      undefined,
    );
  }
}

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ErrorCode } from './error-code';
import { Response, Request } from 'express';
import { ErrorException } from './error-exception';
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    console.log(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let errorException: ErrorException;
    let httpStatusCode: number;

    if (exception instanceof HttpException) {
      httpStatusCode = exception.getStatus();
      errorException = new ErrorException(
        ErrorCode.HTTP_EXCEPTION,
        exception.message,
        undefined,
      );
    } else if (exception instanceof ErrorException) {
      errorException = exception;
      httpStatusCode = exception.httpStatusCode;
    } else {
      httpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      errorException = new ErrorException(
        ErrorCode.UNDEFINED_ERROR,
        'Internal Server Error',
        exception.message,
      );
    }

    this.logger.error(exception.message, exception.description);
    response
      .status(httpStatusCode)
      .setHeader('X-Error-Code', errorException.code)
      .setHeader('X-Error-Message', errorException.message)
      .json(errorException.getErrors());
  }
}

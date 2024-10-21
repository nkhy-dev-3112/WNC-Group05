import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { WithSentry } from '@sentry/nestjs';
import * as Sentry from '@sentry/nestjs';
import { ErrorCode } from './error-code';
import { ErrorException } from './error-exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  @WithSentry()
  catch(exception: any, host: ArgumentsHost) {
    console.log(exception);
    let errorException: ErrorException;
    let httpStatusCode: number;

    if (exception instanceof ErrorException) {
      errorException = exception;
      httpStatusCode = exception.httpStatusCode;
    } else {
      errorException = new ErrorException(
        ErrorCode.UNDEFINED_ERROR,
        exception.response?.error ??
          exception.response?.message ??
          exception.message ??
          'Undefined Error',
        exception.message,
      );
      httpStatusCode = exception.status ?? errorException.httpStatusCode;
    }
  }
}

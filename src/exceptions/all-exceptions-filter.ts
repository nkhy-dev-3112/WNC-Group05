import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { WithSentry } from '@sentry/nestjs';
import { ErrorCode } from './error-code';
import { Response, Request } from 'express'; // Import Request
import { ErrorException } from './error-exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  @WithSentry()
  catch(exception: any, host: ArgumentsHost) {
    console.log(exception);
    let errorException: ErrorException;
    let httpStatusCode: number;

    if (exception.status === 404) {
      httpStatusCode = 404;
      errorException = new ErrorException(
        ErrorCode.RESOURCE_NOT_FOUND,
        'Resource not found',
        'The requested resource could not be found.',
      );
    } else if (exception instanceof ErrorException) {
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

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const logData = {
      timestamp: new Date().toISOString(),
      method: request.method,
      path: request.url,
      requestBody: request.body,
      query: request.query,
      params: request.params,
      headers: request.headers,
      responseStatus: httpStatusCode,
      errorCode: errorException.code,
      errorMessage: errorException.message,
    };

    if (httpStatusCode >= 500 || !(exception instanceof ErrorException)) {
      this.logger.error(logData);
      this.logger.error(exception);
    } else if (httpStatusCode >= 400) {
      this.logger.warn(logData);
      this.logger.warn(exception);
    }

    try {
      response.setHeader('X-Error-Message', errorException.message);
    } catch (headerError) {
      this.logger.error('Error setting X-Error-Message header:', headerError);
      response.setHeader(
        'X-Error-Message',
        'Error setting error message header',
      );
    }

    return response
      .setHeader('X-Error-Code', errorException.code)
      .status(httpStatusCode)
      .json(errorException.getErrors());
  }
}

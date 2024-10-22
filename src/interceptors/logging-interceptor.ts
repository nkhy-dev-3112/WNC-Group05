import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const now = Date.now();
    const method = request.method;
    const url = request.url;
    const body = request.body;

    this.logger.verbose(
      `[${method}] ${url} - Request Body: ${JSON.stringify(body)}`,
    );

    const originalJson = response.json;

    response.json = (data: any) => {
      const responseTime = Date.now() - now;
      const statusCode = response.statusCode;

      this.logger.verbose(
        `[${method}] ${url} - Status: ${statusCode} - Response Time: ${responseTime}ms - Response data: \n ${JSON.stringify(data, null, 2)}`,
      );

      return originalJson.call(response, data);
    };

    return next.handle();
  }
}

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const userAgent = request.get('user-agent') || '';
    const { ip, method, path: url } = request;

    this.logger.debug(
      `${method} - ${url} - ${userAgent} - ${ip}: ${context.getClass().name}.${context.getHandler().name} invoked`,
    );

    const now = Date.now();

    return next.handle().pipe(
      tap((res) => {
        // const response = context.switchToHttp().getResponse();

        const { statusCode } = res;

        this.logger.debug(
          `${method} - ${url} - ${statusCode} - ${userAgent} ${ip} - ${Date.now() - now} ms`,
        );
      }),
      catchError((err) => {
        this.logger.error(err);
        return throwError(() => err);
      }),
    );
  }
}

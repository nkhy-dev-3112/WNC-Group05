import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AppModule } from './modules/app/app.module';
import {
  INestApplication,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './exceptions/all-exceptions-filter';
import { LoggingInterceptor } from './interceptors/logging-interceptor';
import { LogicalException } from './exceptions/logical-exception';
import { ErrorCode } from './exceptions/error-code';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const descriptions: Record<string, string[]> = {};

        const getErrorDescription = (error: any, prefix = '') => {
          const currentPrefix = `${prefix ? prefix + '.' : ''}`;

          if (error.constraints) {
            const constraintDescription: string[] = [];
            const constraints = Object.keys(error.constraints);
            for (const constraint of constraints) {
              constraintDescription.push(error.constraints[`${constraint}`]);
            }
            descriptions[`${currentPrefix}${error.property}`] =
              constraintDescription;
          }

          if (error.children && Array.isArray(error.children)) {
            error.children.forEach((item: any) => {
              getErrorDescription(item, `${currentPrefix}${error.property}`);
            });
          }
        };

        errors.forEach((error) => {
          getErrorDescription(error);
        });
        throw new LogicalException(
          ErrorCode.VALIDATION_ERROR,
          'Validation error.',
          descriptions,
        );
      },
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());

  await setupSwagger(app);

  await app.listen(app.get(ConfigService).get<number>('app.port') ?? 80);
}

async function setupSwagger(app: INestApplication) {
  const swaggerOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  const config = new DocumentBuilder()
    .setTitle('SAKILA - API Documentation')
    .setDescription(
      '<a href="/api/documentation-json" download="swagger.json">Download JSON</a>',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentation', app, document, swaggerOptions);
}
bootstrap();

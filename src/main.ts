import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AppModule } from './modules/app/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './exceptions/all-exceptions-filter';
import { LoggingInterceptor } from './interceptors/logging-interceptor';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
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
    .setTitle('API Documentation')
    .setDescription('API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentation', app, document, swaggerOptions);
}
bootstrap();

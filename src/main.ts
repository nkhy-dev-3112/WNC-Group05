import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  // initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);
  await app.listen(app.get(ConfigService).get<number>('app.port') ?? 80);
}
bootstrap();

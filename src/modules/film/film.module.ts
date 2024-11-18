import { forwardRef, Module } from '@nestjs/common';
import { FilmController } from './app/controllers/actor-controller';
import { AuthModule } from '../auth/auth-module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [FilmController],
})
export class FilmModule {}

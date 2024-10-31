import { forwardRef, Module } from '@nestjs/common';
import { CreateAuthClientCommand } from './app/console/create-auth-client-command';
import { AuthClientGuard } from './guards/auth-client-guard';
import { ConfigModule } from '@nestjs/config';
import auth from './config/auth';
import { FilmModule } from '../film/film.module';
import { ConsoleModule } from 'nestjs-console';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [auth], isGlobal: true }),
    ConsoleModule,
    forwardRef(() => FilmModule),
  ],
  providers: [CreateAuthClientCommand, AuthClientGuard],
  exports: [AuthClientGuard],
})
export class AuthModule {}

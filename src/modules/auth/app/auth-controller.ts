import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from '../data/services/auth-service';
import { ApiOperation } from '@nestjs/swagger';
import { AuthDto } from './auth-dto';
import { Response } from 'express';

@Controller('/api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'Login Api' })
  @Post('login')
  async login(@Body() body: AuthDto, @Res() res: Response) {
    const accessToken = await this.authService.login(body.email, body.password);
    res.json(accessToken);
  }
}

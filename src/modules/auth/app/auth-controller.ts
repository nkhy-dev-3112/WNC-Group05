import { Controller, Post, Body, Res } from '@nestjs/common';
import { LoginDto } from './auth-dto';
import { AuthService } from '../data/services/auth-service';
import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('/api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login api' })
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const tokens = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );
    res.json(tokens);
  }
}

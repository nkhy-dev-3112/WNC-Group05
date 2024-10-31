import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from './auth-dto';
import { AuthService } from './auth-service';
import { ApiOperation, ApiProperty } from '@nestjs/swagger';

@Controller('/api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login api' })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const tokens = await this.authService.login(
      loginDto.username,
      loginDto.password,
    );
    return tokens;
  }
}

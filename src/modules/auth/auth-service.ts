import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(username: string, password: string) {
    const payload = { username: username, sub: password };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '1h',
        secret: process.env.JWT_SECRET,
      }),
      expires_in: '1h',
    };
  }
}

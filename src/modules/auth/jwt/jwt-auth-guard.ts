import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../data/services/auth-service';
import { ErrorException } from '../../../exceptions/error-exception';
import { ErrorCode } from '../../../exceptions/error-code';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const refreshToken = request.headers['x-refresh-token'];
    let token = authHeader?.split(' ')[1];

    if (!token) return false;

    try {
      return await this.authService.verifyAccessToken(token);
    } catch (err) {
      throw new ErrorException(ErrorCode.UNAUTHORIZED, err.message, undefined);
    }
  }
}

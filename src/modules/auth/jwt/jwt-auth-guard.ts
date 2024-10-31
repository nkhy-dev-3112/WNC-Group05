import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../data/services/auth-service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) return false;

    try {
      const isTokenValid = await this.authService.verifyAccessToken(token);

      if (!isTokenValid) {
        const refreshToken = request.headers['x-refresh-token'];

        if (refreshToken) {
          const newAccessToken =
            await this.authService.refreshToken(refreshToken);
          request.headers['authorization'] = `Bearer ${newAccessToken}`;
        } else {
          return false;
        }
      }

      return true;
    } catch (err) {
      return false;
    }
  }
}

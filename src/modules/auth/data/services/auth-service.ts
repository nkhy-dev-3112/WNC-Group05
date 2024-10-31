import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetUserUsecase } from '../../../user/domain/usecases/get-user-usecase';
import { CreateAuthPayloadUsecase } from '../../domain/usecases/auth-payload/create-auth-payload-usecase';
import { ErrorException } from '../../../../exceptions/error-exception';
import { ErrorCode } from '../../../../exceptions/error-code';
import { GetAuthPayloadUsecase } from '../../domain/usecases/auth-payload/get-auth-payload-usecase';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly getUserUsecase: GetUserUsecase,
    private readonly createAuthPayloadUsecase: CreateAuthPayloadUsecase,
    private readonly getAuthPayloadUsecase: GetAuthPayloadUsecase,
  ) {}

  async login(email: string, password: string) {
    const user = await this.getUserUsecase.call(undefined, email);

    if (!user) {
      throw new ErrorException(
        ErrorCode.USER_NOT_FOUND,
        'User not found',
        undefined,
      );
    }

    const authPayload = await this.createAuthPayloadUsecase.call(user.id);

    const accessToken = this.jwtService.sign(authPayload.toJson(), {
      expiresIn: '5s',
      secret: process.env.JWT_SECRET,
    });

    return {
      access_token: accessToken,
      refresh_token: authPayload.id,
      expires_in: '5s',
    };
  }

  async verifyAccessToken(token: string): Promise<boolean> {
    try {
      await this.jwtService.verifyAsync(token);
      return true;
    } catch (err) {
      return false;
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      const authPayload = await this.getAuthPayloadUsecase.call(refreshToken);
      if (!authPayload) {
        throw new ErrorException(
          ErrorCode.AUTH_NOT_FOUND,
          'Auth not found',
          undefined,
        );
      }
      const accessToken = this.jwtService.sign(authPayload.toJson(), {
        expiresIn: '5s',
        secret: process.env.JWT_SECRET,
      });
      return accessToken;
    } catch (error) {
      throw new UnauthorizedException('Refresh token is invalid or expired');
    }
  }
}

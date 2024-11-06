import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ErrorCode } from 'src/exceptions/error-code';
import { ErrorException } from 'src/exceptions/error-exception';
import { GetUserUsecase } from 'src/modules/user/domain/usecases/get-user-usecase';
import { GetAuthPayloadUsecase } from '../../domain/usecases/auth-payload/get-auth-payload-usecase';
import { CreateAuthPayloadUsecase } from '../../domain/usecases/auth-payload/create-auth-payload-usecase';
import { copyFile } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly getUserUsecase: GetUserUsecase,
    private readonly getAuthPayloadUsecase: GetAuthPayloadUsecase,
    private readonly createAuthPayloadUsecase: CreateAuthPayloadUsecase,
  ) {}
  async login(email: string, password: string) {
    const user = await this.getUserUsecase.call(undefined, email, password);
    if (!user) {
      throw new ErrorException(
        ErrorCode.USER_NOT_FOUND,
        'User not found!',
        undefined,
      );
    }
    const authPayload = await this.createAuthPayloadUsecase.call(user.id);
    const accessToken = this.jwtService.sign(authPayload.toJson(), {
      expiresIn: '1m',
      secret: process.env.JWT_SECRET,
    });

    return {
      access_token: accessToken,
      refresh_tokent: authPayload.id,
      expiresIn: '1m',
    };
  }

  async isRefreshTokenRovoke(token: string, refreshToken: string) {
    const authPayload = this.jwtService.decode(token);
    if (!authPayload) {
      throw new ErrorException(
        ErrorCode.UNAUTHORIZED,
        'Invalid Access Token',
        undefined,
      );
    }
    return refreshToken === authPayload.id;
  }

  async verifyAccessToken(token: string): Promise<boolean> {
    try {
      await this.jwtService.verifyAsync(token);
      return true;
    } catch (error) {
      throw new ErrorException(
        ErrorCode.UNAUTHORIZED,
        'Invalid Access Token',
        undefined,
      );
    }
  }
  async refreshToken(refreshToken: string) {
    try {
      const authPayload = await this.getAuthPayloadUsecase.call(refreshToken);
      if (!authPayload) {
        throw new ErrorException(
          ErrorCode.UNAUTHORIZED,
          'Auth not found!',
          undefined,
        );
      }
      const accessToken = this.jwtService.sign(authPayload.toJson(), {
        expiresIn: '1m',
        secret: process.env.JWT_SECRET,
      });
      return accessToken;
    } catch (error) {
      throw new UnauthorizedException('Refresh token is invalid or expired');
    }
  }
}

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { GetUserUsecase } from '../../user/domain/usecases/get-user-usecase';
import { ErrorException } from '../../../exceptions/error-exception';
import { ErrorCode } from '../../../exceptions/error-code';
import { AuthPayloadModel } from '../domain/models/auth-payload-model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly getUserUsecase: GetUserUsecase) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const authPayload: AuthPayloadModel = AuthPayloadModel.fromJson(
      payload.auth_payload,
    );

    const user = await this.getUserUsecase.call(authPayload.userId, undefined);

    if (!user) {
      throw new ErrorException(
        ErrorCode.USER_NOT_FOUND,
        'User not found',
        undefined,
      );
    }

    return authPayload;
  }
}

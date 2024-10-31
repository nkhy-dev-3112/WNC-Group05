import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cryptoJs from 'crypto-js';

@Injectable()
export class AuthClientGuard implements CanActivate {
  constructor(private configService: ConfigService) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const clientId = request.headers['x-client-id'];
    const clientSecret = request.headers['x-client-secret'];

    const isValidClient = this.validateClient(clientId, clientSecret);

    if (!isValidClient) {
      throw new UnauthorizedException('Invalid client credentials');
    }

    return true;
  }

  private validateClient(clientId: string, clientSecret: string): boolean {
    const clientIdHashed = cryptoJs
      .HmacSHA512(clientId, this.configService.get<string>('auth.hashKey'))
      .toString();
    return clientIdHashed == clientSecret;
  }
}

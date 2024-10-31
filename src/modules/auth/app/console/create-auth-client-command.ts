import { ConfigService } from '@nestjs/config';
import { Command, Console } from 'nestjs-console';
import { v4 as uuidV4 } from 'uuid';
import * as cryptoJs from 'crypto-js';

@Console()
export class CreateAuthClientCommand {
  constructor(private readonly configService: ConfigService) {}

  @Command({
    command: 'create:client',
    description: 'Create client service',
  })
  async createClient(): Promise<void> {
    const clientId = uuidV4();
    const clientSecret = cryptoJs
      .HmacSHA512(clientId, this.configService.get<string>('auth.hashKey'))
      .toString();

    console.log('=============================');
    console.log('client_id: ' + clientId);
    console.log('client_secret: ' + clientSecret);
  }
}

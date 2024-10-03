import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GetInformationUsecase {
  constructor(private readonly configService: ConfigService) {}

  public getHello(): string {
    return `${this.configService.get<string>('app.name') ?? 'Unknown'} - ${new Date()}`;
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({ name: 'email', example: 'haaha@gmail.com' })
  @IsString()
  email!: string;

  @ApiProperty({ name: 'password', example: '123' })
  @IsString()
  password!: string;
}

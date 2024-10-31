import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ name: 'email', example: 'nkhy.dev@gmail.com' })
  @IsString()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ name: 'password', example: '12345678' })
  @IsString()
  @IsNotEmpty()
  password!: string;
}

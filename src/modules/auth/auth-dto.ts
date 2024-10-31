import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ name: 'username', example: 'myusername' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ name: 'password', example: 'mypassword' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

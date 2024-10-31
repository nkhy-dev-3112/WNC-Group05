import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({ name: 'id' })
  @IsString()
  id!: string;

  @ApiProperty({ name: 'email' })
  @IsString()
  email!: string;

  @ApiProperty({ name: 'password' })
  @IsString()
  password!: string;

  @ApiProperty({ name: 'is_admin' })
  @IsBoolean()
  isAdmin!: boolean;
}

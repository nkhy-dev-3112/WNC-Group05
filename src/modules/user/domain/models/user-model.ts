import { ApiProperty } from '@nestjs/swagger';

export class UserModel {
  @ApiProperty({ name: 'id' })
  public readonly id: string;

  @ApiProperty({ name: 'email' })
  public readonly email: string;

  @ApiProperty({ name: 'password' })
  public readonly password: string;

  @ApiProperty({ name: 'created_at' })
  public readonly createdAt: Date;

  @ApiProperty({ name: 'updated_at' })
  public readonly updatedAt: Date;

  constructor(
    id: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public toJson(): Record<string, any> {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }
}

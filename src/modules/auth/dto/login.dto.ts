import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'john@email.com' })
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @ApiProperty({ example: 'john@email.com' })
  password: string;
}

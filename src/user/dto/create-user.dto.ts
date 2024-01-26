import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @IsString()
  @IsEmail()
  @ApiProperty({ example: 'john@email.com' })
  email: string;
}

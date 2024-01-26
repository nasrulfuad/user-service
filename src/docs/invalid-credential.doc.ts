import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class InvalidCredentialDoc {
  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode: HttpStatus.BAD_REQUEST;

  @ApiProperty({ example: 'Invalid Credentials' })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;
}

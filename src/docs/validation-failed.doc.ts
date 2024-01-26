import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ValidationFailedDoc {
  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode: HttpStatus.BAD_REQUEST;

  @ApiProperty({ example: ['email must be an email'] })
  message: string[];

  @ApiProperty({ example: 'Bad Request' })
  error: string;
}

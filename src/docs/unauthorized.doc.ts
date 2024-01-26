import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedDoc {
  @ApiProperty({ example: HttpStatus.UNAUTHORIZED })
  statusCode: HttpStatus.UNAUTHORIZED;

  @ApiProperty({ example: 'Unauthorized' })
  message: string;
}

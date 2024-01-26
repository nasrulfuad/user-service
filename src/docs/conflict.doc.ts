import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ConflictDoc {
  @ApiProperty({ example: HttpStatus.CONFLICT })
  statusCode: HttpStatus.CONFLICT;

  @ApiProperty({ example: 'User already exists' })
  message: string;

  @ApiProperty({ example: 'Conflict' })
  error: string;
}

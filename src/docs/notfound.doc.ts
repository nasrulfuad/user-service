import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class NotFoundDoc {
  @ApiProperty({ example: HttpStatus.NOT_FOUND })
  statusCode: HttpStatus.NOT_FOUND;

  @ApiProperty({ example: 'User not found' })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;
}

import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class UserQuery {
  @IsNumber()
  @ApiProperty({ example: '1', required: false })
  @Transform(({ value }) => Number(value))
  @Optional()
  page?: number;

  @IsNumber()
  @ApiProperty({ example: '1', required: false })
  @Transform(({ value }) => Number(value))
  limit?: number;
}

import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class UserQuery {
  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: '1', required: false })
  @Transform(({ value }) => Number(value))
  @Optional()
  page?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: '1', required: false })
  @Transform(({ value }) => Number(value))
  limit?: number;
}

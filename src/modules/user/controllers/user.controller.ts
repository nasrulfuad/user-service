import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConflictDoc } from '../../../docs/conflict.doc';
import { ValidationFailedDoc } from '../../../docs/validation-failed.doc';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserQuery } from '../dto/user-query';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Controller('users')
@ApiTags('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'The record has not been created.',
    type: ValidationFailedDoc,
  })
  @ApiConflictResponse({
    description: 'The record is already exists',
    type: ConflictDoc,
  })
  create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully retrieved.',
  })
  findAll(@Query() query: UserQuery) {
    return this.userService.findAll(query);
  }
}

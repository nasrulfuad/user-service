import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserQuery } from '../dto/user-query';
import { User } from '../entities/user.entity';
import { BadRequestDoc } from 'src/docs/bad-request.doc';

@Controller('users')
@ApiTags('users')
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
    type: BadRequestDoc,
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

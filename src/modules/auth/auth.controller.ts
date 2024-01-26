import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NotFoundDoc } from 'src/docs/notfound.doc';
import { ValidationFailedDoc } from 'src/docs/validation-failed.doc';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse({
    description: 'Login successful',
    schema: {
      type: 'object',
      required: ['accessToken'],
      properties: {
        accessToken: {
          type: 'string',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Email does not exist in the db',
    type: NotFoundDoc,
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
    type: ValidationFailedDoc,
  })
  @ApiBadRequestResponse({
    description: 'Invalid credentials',
    type: ValidationFailedDoc,
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  me() {}
}

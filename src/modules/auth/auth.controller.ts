import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { NotFoundDoc } from 'src/docs/notfound.doc';
import { ValidationFailedDoc } from 'src/docs/validation-failed.doc';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedDoc } from 'src/docs/unauthorized.doc';
import { User } from '../user/entities/user.entity';

@Controller('auth')
@ApiTags('auth')
@UseInterceptors(ClassSerializerInterceptor)
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

  @UseGuards(AuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({
    description: 'UnauthorizedDoc error',
    type: UnauthorizedDoc,
  })
  @ApiOkResponse({
    description: 'Successfully retrieved current user data',
    type: User,
  })
  me(@Request() req: any) {
    return req.user;
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/services/user.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from '../../utils/hash';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValid = await comparePassword(loginDto.password, user._password);

    if (!isValid) {
      throw new BadRequestException('Invalid credentials');
    }

    return {
      accessToken: this.jwtService.sign({ email: user.email }),
    };
  }

  async extractToken(token: string) {
    const { email } = this.jwtService.decode(token);
    return await this.userService.findByEmail(email);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { UserQuery } from '../dto/user-query';
import { mapPagination } from 'src/utils/map-pagination';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    // Logic here
    return this.userRepo.create(createUserDto);
  }

  findAll(q: UserQuery): Promise<ReturnType<typeof mapPagination<User>>> {
    return this.userRepo.findAll(q);
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepo.findByEmail(email);
  }
}

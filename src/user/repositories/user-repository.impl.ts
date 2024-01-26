import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from './user.repository';

export class UserRepositoryImpl implements UserRepository {
  create(createUserDto: CreateUserDto): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
}

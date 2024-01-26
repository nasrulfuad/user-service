import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export interface UserService {
  create(createUserDto: CreateUserDto): Promise<User>;
  findAll(): Promise<User[]>;
}

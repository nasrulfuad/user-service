import { CreateUserDto } from '../dto/create-user.dto';

export interface UserController {
  findAll(): Promise<any>;
  create(createUserDto: CreateUserDto): Promise<any>;
}

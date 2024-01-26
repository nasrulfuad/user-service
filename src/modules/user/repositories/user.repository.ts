import { mapPagination } from '../../../utils/map-pagination';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserQuery } from '../dto/user-query';
import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract create(createUserDto: CreateUserDto): Promise<User>;
  abstract findAll(
    q: UserQuery,
  ): Promise<ReturnType<typeof mapPagination<User>>>;

  abstract findByEmail(email: string): Promise<User>;
}

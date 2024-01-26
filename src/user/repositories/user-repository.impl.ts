import { prisma } from 'src/app/prisma';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from './user.repository';
import { PrismaClient } from '@prisma/client';
import { userFactory } from 'src/utils/user-factory';
import { UserQuery } from '../dto/user-query';
import { mapPagination } from 'src/utils/map-pagination';

export class UserRepositoryImpl implements UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
      },
    });
  }

  async findAll(q: UserQuery): Promise<ReturnType<typeof mapPagination<User>>> {
    const page = q?.page || 1;
    const take = q?.limit || 10;
    const skip = (page - 1) * take;

    const results = await this.prisma.user.findMany({
      skip,
      take,
    });

    return mapPagination<User>({
      page,
      limit: take,
      data: results.map((u) =>
        userFactory({ id: u.id, name: u.name, email: u.email }),
      ),
    });
  }
}

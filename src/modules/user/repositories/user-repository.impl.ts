import { PrismaClient } from '@prisma/client';
import { prisma } from 'src/app/prisma';
import { hashPassword } from 'src/utils/hash';
import { mapPagination } from 'src/utils/map-pagination';
import { userFactory } from 'src/utils/user-factory';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserQuery } from '../dto/user-query';
import { User } from '../entities/user.entity';
import { UserRepository } from './user.repository';
import { ConflictException, NotFoundException } from '@nestjs/common';

export class UserRepositoryImpl implements UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const isUserExist = await this.findByEmail(createUserDto.email);

    if (isUserExist) {
      throw new ConflictException('User already exists');
    }

    const password = await hashPassword(createUserDto.email);

    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password,
      },
    });

    return userFactory({
      id: user.id,
      name: user.name,
      email: user.email,
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
        userFactory({
          id: u.id,
          name: u.name,
          email: u.email,
        }),
      ),
    });
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return new User(user.id, user.name, user.email, user.password);
  }
}

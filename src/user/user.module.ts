import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserRepositoryImpl } from './repositories/user-repository.impl';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
})
export class UserModule {}

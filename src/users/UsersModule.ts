import { Module } from '@nestjs/common/decorators';
import { UsersController } from './UsersController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/UserEntity';
import { UsersService } from './UsersService';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

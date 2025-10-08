import { Module } from '@nestjs/common';
import { WishesService } from './WishesService';
import { WishesController } from './WishesController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wish } from './entities/WishEntity';
import { UsersService } from 'src/users/UsersService';
import { User } from 'src/users/entities/UserEntity';

@Module({
  imports: [TypeOrmModule.forFeature([Wish, User])],
  controllers: [WishesController],
  providers: [WishesService, UsersService],
})
export class WishesModule {}

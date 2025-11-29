import { Module } from '@nestjs/common';
import { WishlistsService } from './WishlistsService';
import { WishlistsController } from './WishlistsController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entities/WishlistEntity';
import { WishesService } from 'src/wishes/WishesService';
import { Wish } from 'src/wishes/entities/WishEntity';
import { UsersService } from 'src/users/UsersService';
import { User } from 'src/users/entities/UserEntity';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist, Wish, User])],
  controllers: [WishlistsController],
  providers: [WishlistsService, WishesService, UsersService],
})
export class WishlistsModule {}

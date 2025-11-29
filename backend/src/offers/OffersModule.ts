import { Module } from '@nestjs/common';
import { OffersService } from './OffersService';
import { UsersService } from 'src/users/UsersService';
//import { UsersModule } from 'src/users/UsersModule';
import { OffersController } from './OffersController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entities/OfferEntity';
import { WishesService } from 'src/wishes/WishesService';
import { Wish } from 'src/wishes/entities/WishEntity';
import { User } from 'src/users/entities/UserEntity';
//import { forwardRef } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([Offer, Wish, User]),
    //forwardRef(() => UsersModule),
  ],
  controllers: [OffersController],
  providers: [OffersService, WishesService, UsersService],
})
export class OffersModule {}

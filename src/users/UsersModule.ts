import { Module } from '@nestjs/common/decorators';
import { UsersController } from './UsersController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/UserEntity';
import { forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { WishesModule } from 'src/wishes/wishes.module';
import { Offer } from 'src/offers/entities/OfferEntity';
import { UsersService } from './UsersService';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Offer]),
    forwardRef(() => AuthModule),
    forwardRef(() => WishesModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

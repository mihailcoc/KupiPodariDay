import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/UsersModule';
import { WishesModule } from './wishes/WishesModule';
import { WishlistsModule } from './wishlists/WishlistsModule';
import { OffersModule } from './offers/OffersModule';
import { User } from './users/entities/UserEntity';
import { Wish } from './wishes/entities/WishEntity';
import { Wishlist } from './wishlists/entities/WishlistEntity';
import { Offer } from './offers/entities/OfferEntity';
import { AuthModule } from './auth/authModule';
import { PassportModule } from '@nestjs/passport/dist';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'kupipodariday',
      entities: [User, Wish, Wishlist, Offer],
      synchronize: true,
    }),
    UsersModule,
    WishesModule,
    WishlistsModule,
    OffersModule,
    AuthModule,
    PassportModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

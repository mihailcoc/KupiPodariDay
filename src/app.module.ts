import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/UsersModule';
import { WishesModule } from './wishes/WishesModule';
import { WishlistsModule } from './wishlists/WishlistsModule';
import { OffersModule } from './offers/OffersModule';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    WishesModule,
    WishlistsModule,
    OffersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

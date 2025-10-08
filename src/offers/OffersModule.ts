import { Module } from '@nestjs/common';
import { OffersService } from './OffersService';
import { OffersController } from './OffersController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entities/OfferEntity';
import { WishesService } from 'src/wishes/WishesService';
import { Wish } from 'src/wishes/entities/WishEntity';

@Module({
  imports: [TypeOrmModule.forFeature([Offer, Wish])],
  controllers: [OffersController],
  providers: [OffersService, WishesService],
})
export class OffersModule {}

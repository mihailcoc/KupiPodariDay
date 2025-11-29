import { CreateOfferDto } from './CreateOffer.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateOfferDto extends PartialType(CreateOfferDto) {}

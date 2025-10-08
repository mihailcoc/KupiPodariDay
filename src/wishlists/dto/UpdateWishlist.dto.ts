import { PartialType } from '@nestjs/mapped-types';
import { CreateWishlistDto } from './CreateWishlist.dto';

export class UpdateWishlistDto extends PartialType(CreateWishlistDto) {}

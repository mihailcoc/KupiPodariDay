import { PartialType } from '@nestjs/mapped-types';
import { CreateWishDto } from './CreateWish.dto';

export class UpdateWishDto extends PartialType(CreateWishDto) {}

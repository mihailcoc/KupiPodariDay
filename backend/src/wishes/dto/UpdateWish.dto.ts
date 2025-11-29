import { PartialType } from '@nestjs/mapped-types';
import { CreateWishDto } from './CreateWish.dto';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateWishDto extends PartialType(CreateWishDto) {
  @IsInt()
  @IsOptional()
  copied?: number;
}

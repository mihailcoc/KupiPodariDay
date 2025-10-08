import { WishlistsService } from './WishlistsService';
import { CreateWishlistDto } from './dto/CreateWishlist.dto';
import { UpdateWishlistDto } from './dto/UpdateWishlist.dto';
import { JwtGuard } from 'src/guards/jwtGuard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}
  /*Показ листа желаний*/
  @UseGuards(JwtGuard)
  @Post()
  async create(@Req() req, @Body() createWishlistDto: CreateWishlistDto) {
    return await this.wishlistsService.create(createWishlistDto, req.user);
  }
  /*Показ листа всех желаний*/
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.wishlistsService.findAll();
  }
  /*Показ листа одного желания*/
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.wishlistsService.findOne(id);
  }
  /*Обновление листа желаний*/
  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: number,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    const curWishlist = await this.wishlistsService.findOne(id);
    if (req.user.id === curWishlist.owner.id) {
      return this.wishlistsService.update(+id, updateWishlistDto);
    } else {
      throw new ForbiddenException();
    }
  }
  /*Удаление листа желаний*/
  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Req() req, @Param('id') id: number) {
    const curWishlist = await this.wishlistsService.findOne(id);
    if (req.user.id === curWishlist.owner.id) {
      return this.wishlistsService.remove(+id);
    } else {
      throw new ForbiddenException();
    }
  }
}

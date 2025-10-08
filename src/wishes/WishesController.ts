import { WishesService } from './WishesService';
import { CreateWishDto } from './dto/CreateWish.dto';
import { UpdateWishDto } from './dto/UpdateWish.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
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
  Headers,
  ForbiddenException,
} from '@nestjs/common';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}
  /*Показ последних 40 желаний*/
  @Get('last')
  findLast() {
    return this.wishesService.findLast();
  }
  /*Показ первых 20 желаний*/
  @Get('top')
  findTop() {
    return this.wishesService.findTop();
  }
  /*Создание желания*/
  @UseGuards(JwtGuard)
  @Post()
  create(@Req() req, @Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(createWishDto, req.user);
  }
  /*Копирование желания пользователя*/
  @UseGuards(JwtGuard)
  @Post(':id/copy')
  copy(@Req() req, @Param('id') id: number) {
    return this.wishesService.copy(req.user, id);
  }
  /*Показ желания*/
  @Get(':id')
  findOne(@Headers() headers, @Param('id') id: string) {
    if (headers['authorization']) {
      return this.wishesService.findOne(+id, true);
    } else {
      return this.wishesService.findOne(+id, false);
    }
  }
  /*Создание желания путем копирования*/
  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: number,
    @Body() updateWishDto: UpdateWishDto,
  ) {
    const curWish = await this.wishesService.findOne(id);
    if (req.user.id === curWish.owner.id && curWish.offers.length === 0) {
      return this.wishesService.update(+id, updateWishDto);
    } else {
      throw new ForbiddenException();
    }
  }
  /*Удаление желания*/
  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Req() req, @Param('id') id: number) {
    const curWish = await this.wishesService.findOne(id);
    if (req.user.id === curWish.owner.id) {
      return this.wishesService.remove(+id);
    } else {
      throw new ForbiddenException();
    }
  }
}

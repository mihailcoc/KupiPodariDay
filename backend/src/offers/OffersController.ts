import { UpdateOfferDto } from './dto/UpdateOffer.dto';
import { OffersService } from './OffersService';
import { JwtGuard } from 'src/guards/jwtGuard';
import { CreateOfferDto } from './dto/CreateOffer.dto';
import {
  Controller,
  UseGuards,
  Post,
  Req,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}
  /*Создаем сумму денег на желание*/
  @UseGuards(JwtGuard)
  @Post()
  create(@Req() req, @Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(createOfferDto, req.user.id);
  }
  /*Находим все желания*/
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.offersService.findAll();
  }
  /*Находим все желание пользователя*/
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.offersService.findOne(+id);
  }
  /*Обновляем желание пользователя*/
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offersService.update(+id, updateOfferDto);
  }
  /*Обновляем желание пользователя*/
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.offersService.remove(+id);
  }
}

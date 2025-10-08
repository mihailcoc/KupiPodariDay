import { UsersService } from './UsersService';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
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
} from '@nestjs/common';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  /*Создаем пользователя*/
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  /*Получаем данные о пользователях*/
  @Post('find')
  findMany(@Body() query: { query: string }) {
    return this.usersService.findMany(query);
  }
  /*Получаем данные о себе как о пользователе*/
  @UseGuards(JwtGuard)
  @Get('me')
  findMe(@Req() req) {
    return this.usersService.findOne(req.user.id);
  }
  /*Получаем данные о своих желаниях*/
  @UseGuards(JwtGuard)
  @Get('me/wishes')
  findWishes(@Req() req) {
    return this.usersService.findWishes(req.user.username);
  }
  /*Получаем данные о желаниях пользователя*/
  @UseGuards(JwtGuard)
  @Get(':username/wishes')
  findAnotherUserWishes(@Param('username') username: string) {
    return this.usersService.findWishes(username);
  }
  /*Получаем данные о пользователе*/
  @UseGuards(JwtGuard)
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }
  /*Изменяем данные о себе как о пользователе*/
  @UseGuards(JwtGuard)
  @Patch('me')
  update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }
  /*Удаляем данные о пользователе*/
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Req() req, @Param('id') id: number) {
    return this.usersService.remove(id, req.user.id);
  }
}

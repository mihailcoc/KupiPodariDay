import { UsersService } from './UsersService';
import { User } from 'src/users/entities/UserEntity';
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
  Session,
} from '@nestjs/common';
import { JwtGuard } from 'src/guards/jwtGuard';
import { ForbiddenException, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'src/types/express/index.d';
import { FindUsersDto } from './dto/QueryUser.dto';
import { UserPublicProfileResponseDto } from './dto/PublicProfileResponseUser.dto';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  /*Создаем пользователя*/
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Get(':id')
  find(@Param('id') postId: string, @Session() session: Record<string, any>) {
    // Сохраняем в сессии количество просмотров поста
    if (!session.visits) {
      session.visits = {
        [postId]: 1,
      };
    } else {
      session.visits[postId] = session.visits[postId]
        ? session.visits[postId] + 1
        : 1;
    }
  }
  /*Получаем данные о пользователях*/
  @Post('find')
  async findMany(
    @Body() body: FindUsersDto,
  ): Promise<UserPublicProfileResponseDto[]> {
    return await this.usersService.findByQuery(body.query);
  }
  /*Получаем данные о своих желаниях*/
  @UseGuards(JwtGuard)
  @Get('me/wishes')
  findWishes(@Req() req) {
    return this.usersService.findWishes(req.user.username);
  }
  /*Получаем данные о себе как о пользователе*/
  @UseGuards(JwtGuard)
  @Get('me')
  me(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    user: User,
  ) {
    const authCookie = request[`cookies`];

    if (this.authService.auth(authCookie)) {
      return this.usersService.findOne(request.user.id);
    }

    try {
      const token = this.authService.auth(user);

      // устанавливаем куку в ответ на запрос
      response.cookie('authCookie', token);
    } catch (_) {
      throw new ForbiddenException(_);
    }
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

import { UsersService } from './UsersService';
import { FindUsersDto } from './dto/query-user.dto';
import { UserProfileResponseDto } from './dto/profile-respons-user.dto';
import { UserWishesDto } from './dto/wishes-user.dto';
import { UserPublicProfileResponseDto } from './dto/public-profile-response-user.dto';
import { HttpExceptionFilter } from 'src/filters/HttpException.filter';
import { HttpException } from '@nestjs/common';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import {
  Body,
  Post,
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
  UseFilters,
} from '@nestjs/common/decorators';
import { User } from './entities/UserEntity';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { FindOneOptions } from 'typeorm';
import { JWTAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { WishesService } from 'src/wishes/wishes.service';
import { Wish } from 'src/wishes/entities/wish.entity';

@UseGuards(JWTAuthGuard)
@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly wishesService: WishesService,
  ) {}
  /*Создаем пользователя*/
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  /*Получаем данные о себе как о пользователе*/
  @Get('me')
  async findOwn(@AuthUser() user: User): Promise<UserProfileResponseDto> {
    const query: FindOneOptions<User> = {
      where: { id: user.id },
      select: {
        email: true,
        username: true,
        id: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        about: true,
      },
    };
    return this.usersService.findOne(query);
  }
  /*Изменяем данные о себе как о пользователе*/
  @Patch('me')
  async update(
    @AuthUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserProfileResponseDto> {
    const updateUser = await this.usersService.update(user, updateUserDto);
    if (updateUser) return updateUser;
    else {
      throw new HttpException('User doesn`t exist', 400);
    }
  }
  /*Получаем данные о своих желаниях*/
  @Get('me/wishes')
  async findMyWishes(@AuthUser() user: User): Promise<Wish[]> {
    return await this.wishesService.findWishById(user.id);
  }
  /*Получаем данные о пользователе*/
  @Get(':username')
  async findUser(@Param() param: { username: string }): Promise<User> {
    const { username } = param;
    return await this.usersService.findUserName(username);
  }
  /*Получаем данные о желаниях пользователя*/
  @Get(':username/wishes')
  async findUserWishes(
    @Param() param: { username: string },
  ): Promise<UserWishesDto[]> {
    const { username } = param;
    return await this.usersService.findUserWishes(username);
  }
  /*Получаем данные о пользователях*/
  @Post('find')
  async findByQuery(
    @Body() body: FindUsersDto,
  ): Promise<UserPublicProfileResponseDto[]> {
    return await this.usersService.findByQuery(body.query);
  }
}

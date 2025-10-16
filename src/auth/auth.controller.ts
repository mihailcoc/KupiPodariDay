import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { UsersService } from '../users/UsersService';
import { AuthService } from './auth.service';
import { LocalGuard } from '../guards/localGuard';
import { CreateSaveUserDto } from '../users/dto/CreateSaveUser.dto';

@Controller()
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  signin(@Req() req): { access_token: string } {
    /* генерируем JWT-токен */
    return this.authService.auth(req.user);
  }
  /* По свагеру, при регистрации нужно вернуть обьект созданного юзера без поля password */
  @Post('signup')
  async signup(@Body() createsaveUserDto: CreateSaveUserDto) {
    /* создаём пользователя и токен */
    const user = await this.usersService.createsaveuser(createsaveUserDto);
    return user;
  }
}

import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { UsersService } from '../users/UsersService';
import { AuthService } from './authService';
import { LocalGuard } from '../guards/localGuard';
import { CreateUserDto } from '../users/dto/CreateUser.dto';

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

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    /* создаём пользователя и токен */
    const user = await this.usersService.create(createUserDto);

    return this.authService.auth(user);
  }
}

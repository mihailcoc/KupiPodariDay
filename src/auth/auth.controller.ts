import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { UsersService } from '../users/UsersService';
import { AuthService } from './auth.service';
import { LocalGuard } from '../guards/localGuard';
import { CreateUserDto } from '../users/dto/CreateUser.dto';
import { saveUser } from 'src/common/decorators/user.decorator';

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
  /* используем декоратор @saveUser() чтобы передать юзера без пароля */
  @Post('signup')
  async signup(@saveUser() @Body() createUserDto: CreateUserDto) {
    /* создаём пользователя и токен */
    const user = await this.usersService.create(createUserDto);

    return this.authService.auth(user);
  }
}

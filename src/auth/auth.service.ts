import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/UserEntity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/UsersService';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    //private UserRepository: Repository<User>,
    //@InjectRepository(User) private UserRepository: Repository<User>,
  ) {}

  auth(user: User) {
    const payload = { sub: user.id };
    /* генерация токена */
    return { access_token: this.jwtService.sign(payload) };
  }

  async validatePassword(username: string, password: string) {
    const user = await this.userService.findByUsername(username);

    /* пароль захэширован */
    if (user && user.password === password) {
      /* исключаем пароль */
      const { ...result } = user;

      return result;
    }

    return null;
  }
  //async isAuthorized(@Req() request: Request) {
  //  const authCookie = request[`cookies`];
  //   return this.auth(authCookie);
  //}
}

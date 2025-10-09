import { Module } from '@nestjs/common/decorators';
import { UsersController } from './UsersController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/UserEntity';
import { UsersService } from './UsersService';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtService],
  exports: [UsersService],
})
export class UsersModule {}

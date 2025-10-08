import { Module } from '@nestjs/common';
import { AuthService } from './authService';
import { UsersModule } from '../users/UsersModule';
import { JwtStrategy } from './jwtStrategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport/dist';
import { LocalStrategy } from './localStrategy';
import { AuthController } from './authController';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt_secret', 'jwt_secret'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

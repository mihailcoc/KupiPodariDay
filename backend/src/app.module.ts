import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/UsersModule';
import { WishesModule } from './wishes/WishesModule';
import { WishlistsModule } from './wishlists/WishlistsModule';
import { OffersModule } from './offers/OffersModule';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport/dist';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    //устанавливаем соединение с базой
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configServives: ConfigService) => ({
        type: 'postgres',
        host: configServives.get<string>('DB_HOST'),
        port: configServives.get<number>('DB_PORT'),
        username: configServives.get<string>('DB_USERNAME'),
        password: configServives.get<string>('DB_PASSWORD'),
        database: configServives.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.js, .ts}'], //сущности, которые описывают базу данных.
        synchronize: true, //подгоняeт базу в СУБД к той, что описана в ORM.
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    WishesModule,
    WishlistsModule,
    OffersModule,
    AuthModule,
    PassportModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { User } from './entities/UserEntity';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}
  /*функция поиска пользователя*/
  async findOne(id: number): Promise<User> {
    const user = await this.UserRepository.findOneBy({ id });
    return user;
  }
  /*функция создания пользователя*/
  async create(createUserDto: CreateUserDto) {
    return this.UserRepository.save(createUserDto);
  }
  /*функция нахождения пользователей по email*/
  async findMany(search: { query: string }) {
    let users: User[];
    users = await this.UserRepository.find({
      where: { email: search.query },
    });
    if (users.length < 1) {
      users = await this.UserRepository.find({
        where: { username: search.query },
      });
    }
    return users;
  }

  /*Функция обновления данных пользователя*/
  async update(id: number, updateUserDto: UpdateUserDto) {
    const { password, ...rest } = updateUserDto;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await this.UserRepository.update(id, {
        password: hashedPassword,
        ...rest,
      });
    } else {
      await this.UserRepository.update(id, rest);
    }
  }
  /*Находим пользователя по имени и адресу электронной почты*/
  async findByQuery(query: string): Promise<User[]> {
    const users = await this.UserRepository.find({
      where: [{ username: query }, { email: query }],
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        username: true,
        about: true,
        avatar: true,
      },
    });
    return users;
  }
  /*Удаляем пользователя*/
  remove(id: number, userId) {
    if (userId === id) {
      return this.UserRepository.delete({ id });
    } else {
      throw new ForbiddenException();
    }
  }
  /*Функция нахождения желаний пользователя*/
  async findWishes(username: string) {
    const user = await this.UserRepository.findOne({
      where: {
        username,
      },
      relations: {
        wishes: true,
      },
    });

    return user.wishes;
  }
  /*Функция нахождения пользователя по имени пользователя*/
  findByUsername(username: string): Promise<User> {
    return this.UserRepository.findOne({
      where: { username },
      relations: {
        wishes: true,
        offers: true,
        userwishes: true,
      },
    });
  }
}

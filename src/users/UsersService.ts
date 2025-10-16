import { CreateUserDto } from './dto/CreateUser.dto';
import { CreateSaveUserDto } from '../users/dto/CreateSaveUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { User } from './entities/UserEntity';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { hashValue } from 'src/helpers/hash';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}
  /*функция поиска пользователя*/
  async findOne(id: number): Promise<User> {
    const user = await this.UserRepository.findOneBy({ id });
    return user;
  }
  /*функция поиска пользователя*/
  async findById(id: number): Promise<User> {
    const user = await this.UserRepository.findOneBy({ id });
    return user;
  }
  /*функция создания пользователя*/
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    const user = await this.UserRepository.create({
      ...createUserDto,
      password: await hashValue(password),
    });
    return this.UserRepository.save(user);
  }
  /*функция создания пользователя*/
  /* По свагеру, при регистрации нужно вернуть обьект созданного юзера без поля password */
  async createsaveuser(createsaveUserDto: CreateSaveUserDto): Promise<User> {
    const user = await this.UserRepository.create({
      ...createsaveUserDto,
    });
    return this.UserRepository.save(user);
  }
  /*функция нахождения пользователей по email*/
  async findMany(query: string): Promise<User[]> {
    return this.UserRepository.createQueryBuilder('user')
      .where({ username: query }, { email: query })
      .getMany();
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
      where: [{ username: Like(`%${query}%`) }, { email: Like(`%${query}%`) }],
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

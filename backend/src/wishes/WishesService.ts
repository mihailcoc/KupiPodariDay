import { HttpException, Injectable } from '@nestjs/common';
import { UpdateWishDto } from './dto/UpdateWish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/WishEntity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/UserEntity';
import { UsersService } from 'src/users/UsersService';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private WishRepository: Repository<Wish>,
    private readonly usersService: UsersService,
  ) {}
  /*Функция создания желания*/
  create(wish, user: User): Promise<Wish[]> {
    const owner = this.usersService.findById(user.id);
    const newWish = { ...wish, owner };
    return this.WishRepository.save(newWish);
  }
  /*Функция копирования желания*/

  async copy(id: number, user: User): Promise<Wish> {
    const queryRunner =
      this.WishRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const owner = await this.usersService.findById(user.id);

      if (!owner) {
        throw new Error('Пользователь не найден');
      }
      const wish = await this.WishRepository.findOneByOrFail({ id });
      const existingCopy = await this.WishRepository.findOne({
        where: { owner: { id: user.id }, name: wish.name, link: wish.link },
      });

      if (existingCopy) {
        throw new HttpException('Вы уже копировали себе этот подарок', 409);
      }
      const { description, image, link, name, price } = wish;
      const copyWish = this.WishRepository.create({
        description,
        image,
        link,
        name,
        price,
        owner,
      });

      wish.copied += 1;
      await queryRunner.manager.save(wish);
      const savedCopy = await queryRunner.manager.save(copyWish);

      await queryRunner.commitTransaction();
      return savedCopy;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  /*Функция нахождения желаний по запросу*/
  findAll() {
    return this.WishRepository.find();
  }
  /*Функция нахождения желания по запросу*/
  async findOne(id: number, hasAuth = true) {
    const wish = await this.WishRepository.findOne({
      where: { id },
      relations: {
        offers: true,
      },
    });
    /*Обновление суммы взноса на желание*/
    const amounts = wish.offers.map((offer) => offer.amount);

    const generalAmount = amounts.reduce((acc, cur) => acc + cur, 0);

    await this.WishRepository.update({ id }, { raised: generalAmount });

    if (hasAuth) {
      return this.WishRepository.findOne({
        where: { id },
        relations: {
          owner: true,
          offers: true,
        },
      });
    } else {
      return this.WishRepository.findOne({
        where: { id },
        relations: {
          owner: true,
          offers: false,
        },
      });
    }
  }
  findTop() {
    return this.WishRepository.find({
      order: { copied: 'DESC' },
      take: 20,
    });
  }

  update(id: number, updateWishDto: UpdateWishDto) {
    return this.WishRepository.update({ id }, updateWishDto);
  }

  remove(id: number) {
    return this.WishRepository.delete({ id });
  }
  /*Функция нахождения желаний по запросу*/
  async findMany(wishesId: number[]) {
    return wishesId.map(async (id) => {
      const wish = await this.findOne(id);
      return wish;
    });
  }

  findLast() {
    return this.WishRepository.find({
      order: { id: 'DESC' },
      take: 40,
    });
  }
}

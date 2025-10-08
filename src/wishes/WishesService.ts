import { Injectable } from '@nestjs/common';
import { UpdateWishDto } from './dto/UpdateWish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/WishEntity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/UserEntity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private WishRepository: Repository<Wish>,
  ) {}
  /*Функция создания желания*/
  create(wish, owner: User) {
    const newWish = { ...wish, owner };

    return this.WishRepository.save(newWish);
  }
  /*Функция копирования желания*/
  async copy(user: User, id: number) {
    const curWish = await this.findOne(id);

    await this.update(curWish.id, {
      copied: (curWish.copied += 1),
    });

    const { ...wish } = curWish;

    return this.create({ ...wish, owner: user, offers: [] }, user);
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

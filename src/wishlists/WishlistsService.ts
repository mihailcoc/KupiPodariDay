import { Injectable } from '@nestjs/common';
import { UpdateWishlistDto } from './dto/UpdateWishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/WishlistEntity';
import { Repository } from 'typeorm';
import { WishesService } from 'src/wishes/WishesService';
import { User } from 'src/users/entities/UserEntity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private WishlistRepository: Repository<Wishlist>,
    private readonly wishesService: WishesService,
  ) {}
  /*Функция создания листа желаний*/
  async create(createWishlist, owner: User) {
    const items = await Promise.all(
      createWishlist.itemsId.map((itemId) =>
        this.wishesService.findOne(itemId),
      ),
    );
    const { image, name } = createWishlist;
    return await this.WishlistRepository.save({
      image,
      name,
      owner,
      items,
    });
  }
  /*Функция создания листа всех желаний*/
  findAll() {
    return this.WishlistRepository.find({
      relations: {
        owner: true,
        items: true,
      },
    });
  }
  /*Функция создания листа одного желания*/
  findOne(id: number) {
    return this.WishlistRepository.findOne({
      where: { id },
      relations: {
        owner: true,
        items: true,
      },
    });
  }
  /*Функция обновления листа всех желаний*/
  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return this.WishlistRepository.update({ id }, updateWishlistDto);
  }
  /*Функция удаления листа всех желаний*/
  remove(id: number) {
    return this.WishlistRepository.delete({ id });
  }
}

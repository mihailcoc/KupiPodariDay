import { IsEmail, IsUrl, Length } from 'class-validator';
import { Offer } from 'src/offers/entities/OfferEntity';
import { Wish } from 'src/wishes/entities/WishEntity';
import { Wishlist } from 'src/wishlists/entities/WishlistEntity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  /*Создаем уникальный номер пользователя*/
  @PrimaryGeneratedColumn()
  id: number;
  /*Поле даты и времени создания*/
  @CreateDateColumn()
  createdAt: Date;
  /*Поле даты и времени обновления*/
  @UpdateDateColumn()
  updatedAt: Date;
  /*Поле имени пользователя*/
  @Column({ unique: true })
  @Length(2, 30)
  username: string;
  /*Поле описания пользователя*/
  @Column({ type: 'varchar', length: 200 })
  @Length(2, 200)
  about: string;
  /*Фотография пользователя*/
  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsUrl()
  avatar: string;
  /*Поле электронной почты*/
  @Column({ unique: true })
  @IsEmail()
  email: string;
  /*Поле пароля для входа*/
  @Column()
  password: string;
  /*Связь один ко многим один владелец ко многим желаниям*/
  @JoinColumn()
  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];
  /*Связь один ко многим один пользователь ко многим предложениям*/
  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];
  /*Связь один ко многим один владелец ко многим листам с желаниями*/
  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  userwishes: Wishlist[];
}

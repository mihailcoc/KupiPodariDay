import { IsUrl, Length } from 'class-validator';
import { User } from 'src/users/entities/UserEntity';
import { Wish } from 'src/wishes/entities/WishEntity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @Length(1, 250)
  name: string;

  @ManyToOne(() => User, (user) => user.userwishes)
  owner: User;

  @ManyToMany(() => Wish)
  @JoinTable()
  items: Wish[];

  @Column()
  @IsUrl()
  image: string;
}

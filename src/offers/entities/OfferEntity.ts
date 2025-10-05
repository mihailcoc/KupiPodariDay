import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Contains } from 'class-validator';
/*import { Transform } from 'class-transformer';*/
import { Wish } from 'src/wishes/entities/wish.entity';
import { User } from 'src/users/entities/UserEntity';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  amount: number;

  @Column()
  @Contains('false')
  hidden: boolean;
}

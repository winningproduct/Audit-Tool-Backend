import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product';
import { User } from './user';

@Entity('Product_User')
// tslint:disable-next-line: class-name
export class Product_User {
  @PrimaryGeneratedColumn()
  Id!: number;

  @Column()
  ProductId!: number;
  @ManyToOne(
    () => Product,
    product => product.productusers,
  )
  @JoinColumn({ name: 'ProductId' })
  product: Product | undefined;

  @Column()
  UserId!: number;
  @ManyToOne(
    () => User,
    user => user.productuser,
  )
  @JoinColumn({ name: 'UserId' })
  user: User | undefined;
}

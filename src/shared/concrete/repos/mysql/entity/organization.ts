import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user';
import { Product } from './product';
import { Domain } from './domain';

@Entity('Organization')
export class Organization {
  @PrimaryGeneratedColumn()
  Id!: number;
  @Column()
  Name!: string;
  @Column()
  Email!: string;
  @Column()
  PhoneNumber!: string;
  @Column()
  CreatedDate!: Date;

  @OneToMany(
    () => User,
    user => user.organization,
  )
  users: User[] | undefined;

  @OneToMany(
    () => Product,
    product => product.organization,
  )
  products: Product[] | undefined;

  @OneToMany(
    () => Domain,
    domain => domain.organization,
  )
  domains: Domain[] | undefined;
}

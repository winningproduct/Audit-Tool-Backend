import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Organization } from './organization';
import { User } from './user';
import { Product_User } from './product_user';
import { ProductPhase } from './product_phase';
import { Evidence } from './evidence';

@Entity('Product')
export class Product {
  @PrimaryGeneratedColumn()
  Id!: number;
  @Column()
  Name!: string;
  @Column()
  Email!: string;
  @Column()
  Description!: string;
  @Column()
  CreatedDate!: Date;

  @Column()
  OrganizationId: number | undefined;
  @ManyToOne(
    () => Organization,
    organization => organization.products,
  )
  @JoinColumn({ name: 'OrganizationId' })
  organization: Organization | undefined;

  @Column()
  CreatedUserId: number | undefined;
  @ManyToOne(
    () => User,
    user => user.products,
  )
  @JoinColumn({ name: 'CreatedUserId' })
  user: User | undefined;

  @OneToMany(
    () => Product_User,
    productuser => productuser.user,
  )
  productusers: Product_User[] | undefined;

  @OneToMany(
    () => ProductPhase,
    productphase => productphase.product,
  )
  productphases: ProductPhase[] | undefined;

  @OneToMany(
    () => Evidence,
    evidence => evidence.question,
  )
  evidences: Evidence[] | undefined;
}

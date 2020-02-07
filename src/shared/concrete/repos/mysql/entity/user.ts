import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Organization } from './organization';
import { Product } from './product';
import { Product_User } from './product_user';
import { Question } from './question';
import { Evidence } from './evidence';
@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  Id!: number;
  @Column()
  FirstName!: number;
  @Column()
  LastName!: string;
  @Column()
  Email!: string;
  @Column()
  PhoneNumber!: string;
  @Column()
  CreatedDate!: Date;

  @Column()
  OrganizationId: number | undefined;
  @ManyToOne(
    () => Organization,
    organization => organization.users,
  )
  @JoinColumn({ name: 'OrganizationId' })
  organization: Organization | undefined;

  @OneToMany(
    () => Product,
    product => product.user,
  )
  products: Product[] | undefined;

  @OneToMany(
    () => Product_User,
    productuser => productuser.user,
  )
  productuser: Product_User[] | undefined;

  @OneToMany(
    () => Question,
    question => question.user,
  )
  questions: Question[] | undefined;

  @OneToMany(
    () => Evidence,
    evidence => evidence.question,
  )
  evidences: Evidence[] | undefined;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne
} from 'typeorm';
import { AuditDetail } from './audit_detail';
import { Organization } from './organization';
import { Product } from './product';
import { Question } from './question';
import { Evidence } from './evidence';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  phoneNumber!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdDate!: Date;

  @OneToMany(
    type => AuditDetail,
    auditDetail => auditDetail.user,
  )
  auditDetails!: AuditDetail[];

  @ManyToOne(
    type => Organization,
    organization => organization.users,
  )
  organization!: Organization;

  @OneToMany(
    type => Product,
    product => product.user,
  )
  products!: Product[];

  @OneToMany(
    type => Question,
    question => question.user,
  )
  questions!: Question[];

  @OneToMany(
    type => Evidence,
    evidence => evidence.user,
  )
  evidences!: Evidence[];
}

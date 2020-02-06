import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Organization } from './organization';

@Entity('Domain')
export class Domain {
  @PrimaryGeneratedColumn()
  Id!: number;

  @Column()
  OrganizationId!: number;
  @ManyToOne(
    () => Organization,
    organization => organization.users,
  )
  @JoinColumn({ name: 'OrganizationId' })
  organization: Organization | undefined;

  @Column()
  Domain!: string;
}

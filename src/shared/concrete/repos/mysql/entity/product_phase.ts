import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product';
import { Phase } from './phase';

@Entity('Product_Phase')
// tslint:disable-next-line: class-name
export class Product_Phase {
  @PrimaryGeneratedColumn()
  Id!: number;

  @Column()
  ProductId!: number;
  @ManyToOne(
    () => Product,
    product => product.productphases,
  )
  @JoinColumn({ name: 'ProductId' })
  product: Product | undefined;

  @Column()
  PhaseId!: number;
  @ManyToOne(
    () => Phase,
    phase => phase.productphases,
  )
  @JoinColumn({ name: 'PhaseId' })
  phase: Phase | undefined;

  @Column()
  Score!: number;
}

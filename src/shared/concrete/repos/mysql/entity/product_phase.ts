import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product';
import { Phase } from './phase';

@Entity('ProductPhase')
export class ProductPhase {
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

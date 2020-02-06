import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductPhase } from './product_phase';
import { KnowledgeArea } from './knowledgeArea';
import { Revision } from './revision';

@Entity('Phase')
export class Phase {
  @PrimaryGeneratedColumn()
  Id!: number;
  @Column()
  Name!: string;
  @Column()
  Description!: string;

  @OneToMany(
    () => ProductPhase,
    productphase => productphase.product,
  )
  productphases: ProductPhase[] | undefined;

  @OneToMany(
    () => KnowledgeArea,
    knowledgearea => knowledgearea.phase,
  )
  knowledgeareas: KnowledgeArea[] | undefined;

  @OneToMany(
    () => Revision,
    revision => revision.phase,
  )
  revisions: Revision[] | undefined;
}

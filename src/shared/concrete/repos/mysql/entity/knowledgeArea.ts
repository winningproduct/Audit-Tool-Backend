import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Phase } from './phase';
import { Question } from './question';

@Entity('KnowledgeArea')
export class KnowledgeArea {
  @PrimaryGeneratedColumn()
  Id!: number;

  @Column()
  PhaseId: number | undefined;
  @ManyToOne(
    () => Phase,
    phase => phase.knowledgeareas,
  )
  @JoinColumn({ name: 'PhaseId' })
  phase: Phase | undefined;
  @Column()
  Name!: string;
  @Column()
  Description!: string;
  @Column()
  Score!: number;

  @OneToMany(
    () => Question,
    question => question.knowledgearea,
  )
  questions: Question[] | undefined;
}

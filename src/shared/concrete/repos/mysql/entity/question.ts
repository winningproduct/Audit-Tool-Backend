import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { KnowledgeArea } from './knowledgeArea';
import { Revision } from './revision';
import { User } from './user';
import { Evidence } from './evidence';

@Entity('Question')
export class Question {
  @PrimaryGeneratedColumn()
  Id!: number;

  @Column()
  KnowledgeAreaId: number | undefined;
  @ManyToOne(
    () => KnowledgeArea,
    knowledgearea => knowledgearea.questions,
  )
  @JoinColumn({ name: 'KnowledgeAreaId' })
  knowledgearea: KnowledgeArea | undefined;

  @Column()
  RevisionId: number | undefined;
  @ManyToOne(
    () => Revision,
    revision => revision.questions,
  )
  @JoinColumn({ name: 'RevisionId' })
  revision: Revision | undefined;

  @Column()
  UserId: number | undefined;
  @ManyToOne(
    () => User,
    user => user.questions,
  )
  @JoinColumn({ name: 'UserId' })
  user: User | undefined;

  @Column()
  Title!: string;
  @Column()
  Description!: string;
  @Column()
  Version!: number;
  @Column()
  CreatedDate!: Date;

  @OneToMany(
    () => Evidence,
    evidence => evidence.question,
  )
  evidences: Evidence[] | undefined;
}

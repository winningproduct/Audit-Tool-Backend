import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Question } from './question';
import { Phase } from './phase';

@Entity('Revision')
export class Revision {
  @PrimaryGeneratedColumn()
  Id!: number;

  @Column()
  PhaseId: number | undefined;
  @ManyToOne(
    () => Phase,
    phase => phase.revisions,
  )
  @JoinColumn({ name: 'PhaseId' })
  phase: Phase | undefined;

  @Column()
  Name!: number;
  @Column()
  ReleaseNotes!: string;
  @Column()
  CreatedDate!: Date;
  @Column()
  Email!: string;
  @Column()
  Version!: number;

  @OneToMany(
    () => Question,
    question => question.revision,
  )
  questions: Question[] | undefined;
}

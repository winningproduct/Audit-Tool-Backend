import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user';
import { Question } from './question';
import { Product } from './product';

@Entity('Evidence')
export class Evidence {
  @PrimaryGeneratedColumn()
  Id!: number;

  @Column()
  ProductId: number | undefined;
  @ManyToOne(
    () => Product,
    product => product.evidences,
  )
  @JoinColumn({ name: 'ProductId' })
  evidence: Product | undefined;

  @Column()
  QuestionId: number | undefined;
  @ManyToOne(
    () => Question,
    question => question.evidences,
  )
  @JoinColumn({ name: 'QuestionId' })
  question: Question | undefined;

  @Column()
  UserId: number | undefined;
  @ManyToOne(
    () => User,
    user => user.evidences,
  )
  @JoinColumn({ name: 'UserId' })
  user: User | undefined;

  @Column()
  Content!: string;
  @Column()
  Status!: string;
  @Column()
  Version!: number;
  @Column()
  CreatedDate!: Date;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Phase {
  @PrimaryGeneratedColumn()
  Id!: number;
  @Column()
  Content!: string;
  @Column()
  Status!: string;
  @Column()
  Version!: string;
  @Column()
  CreatedDate!: Date;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Phase {
    @PrimaryGeneratedColumn()
    Id!: number;
    @Column()
    Name!: string;
    @Column()
    Description!: string;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product_Phase {
    @PrimaryGeneratedColumn()
    Id!: number;
    @Column()
    ProductId!: number;
    @Column()
    PhaseId!: number;
    @Column()
    Score!: number;
}

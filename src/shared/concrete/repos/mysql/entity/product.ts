import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    Id!: number;
    @Column()
    OrganizationId: number | undefined;
    @Column()
    CreatedUserId!: number;
    @Column()
    Email!: string;
    @Column()
    name!: string;
    @Column()
    Description!: string;
    @Column()
    CreatedDate!: Date;
}

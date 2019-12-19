import { BaseEntity } from './baseEntity';

export class Product extends BaseEntity {
    name!: string;
    createdDate!: Date;
}

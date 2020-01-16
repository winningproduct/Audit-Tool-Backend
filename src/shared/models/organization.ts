import { BaseEntity } from './baseEntity';

export class Orgnization extends BaseEntity {
  userId!: number;
  name!: string;
  email!: string;
  createdDate!: Date;
  phoneNumber!: string;
}

import { BaseEntity } from './baseEntity';

export class Evidence extends BaseEntity {
  content!: string;
  status!: string;
  version!: string;
  createdDate!: string;
}

import { BaseEntity } from './baseEntity';

export class Phase extends BaseEntity {
    productPhaseId!: number;
    phaseId!: number;
    name!: string;
    description!: string;
    score!:string;
}

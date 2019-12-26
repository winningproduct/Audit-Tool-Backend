import { Required } from "joi-typescript-validator";

export class Id {
    @Required()
    id!: number;
}
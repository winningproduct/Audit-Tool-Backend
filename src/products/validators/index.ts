import { Validate, Required } from 'joi-typescript-validator';

export class Id {
    @Required()
    id!: number;
}

export async function getProductsByUser(token: number) {
    const value: Id = new Id();
    value.id = token;
    await Validate(value);
}

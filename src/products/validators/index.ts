import { Validate, Required } from 'joi-typescript-validator';

export class Id {
    @Required()
    id!: string;
}

export async function getProductsByUser(token: string) {
    const value: Id = new Id();
    value.id = token;
    await Validate(value);
}

import { Validate } from 'joi-typescript-validator';
import { Id } from './models/productByUser.model';

export default class ProductValidator {
    async getProductsByUser(token: number) {
        const value: Id = new Id();
        value.id = token;
        await Validate(value);
    }

    async getPhases(token: number) {
        const value: Id = new Id();
        value.id = token;
        await Validate(value);
    }

    async getProductByProductPhaseId(token: number) {
        const value: Id = new Id();
        value.id = token;
        await Validate(value);
    }

    async getProductById(token: number) {
        const value: Id = new Id();
        value.id = token;
        await Validate(value);
    }
}

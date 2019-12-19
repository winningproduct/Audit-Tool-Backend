import { IRepository } from './repository.interface';
import { Product } from '../../models/product';

export interface IProductRepository extends IRepository<Product> {
    getProductsByUser(userId: number): Promise<Product[]>;
}

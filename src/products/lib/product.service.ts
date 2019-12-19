import { IProductRepository } from '../../shared/abstract/repos/product.repository.interface';

export class ProductService {

    constructor(private _productRepository: IProductRepository) {
    }
    async getProductsByUser(userId: number) {
        return await this._productRepository.getProductsByUser(userId);
    }

    // test sample
    async searchProducts(userId: number, query: string) {
        const products = await this._productRepository.getProductsByUser(userId);
        return products.filter( (p) => p.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
    }
}

import { IProductRepository } from '../../shared/abstract/repos/product.repository.interface';
import { IPhaseRepository } from '../../shared/abstract/repos/phase.repository.interface';

export class ProductService {
    constructor(private _productRepository: IProductRepository,
                private _phaseRepository: IPhaseRepository) {
    }
    async getProductsByUser(userId: number) {
        return await this._productRepository.getProductsByUser(userId);
    }
    async getProductByProductPhaseId(productPhaseId: number) {
        return await this._productRepository.getProductByProductPhaseId(productPhaseId);
    }
    // test sample
    async searchProducts(userId: number, query: string) {
        const products = await this._productRepository.getProductsByUser(userId);
        return products.filter( (p) => p.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
    }
    async getPhases(productId: number) {
        return await this._phaseRepository.getPhases(productId);
    }
     async getProductById(productId: number) {
         return await this._productRepository.getProductById(productId);
     }
}

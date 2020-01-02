import { IProductRepository } from '@repos/product.repository.interface';
import { IPhaseRepository } from '@repos/phase.repository.interface';
import { IProductService } from 'products/interfaces/product.service.interface';

export class ProductService implements IProductService{
  constructor(
    private _productRepository: IProductRepository,
    private _phaseRepository: IPhaseRepository,
  ) {}
  async getProductsByUser(userId: number) {
    return await this._productRepository.getProductsByUser(userId);
  }

  async getProductByProductPhaseId(productPhaseId: number) {
    return await this._productRepository.getProductByProductPhaseId(
      productPhaseId,
    );
  }

  async getPhases(productId: number) {
    return await this._phaseRepository.getPhases(productId);
  }

  async getProductById(productId: number) {
    return await this._productRepository.getProductById(productId);
  }
}

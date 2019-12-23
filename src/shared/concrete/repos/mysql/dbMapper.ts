import { Product } from '../../../models/product';

export function mapDbItems<T>(result: any, mapper: any): T {
    return result[0].map((product: any) => {
      return mapper(product);
    });
  }
export function productMapper(product: any): Product {
    return {
      id: product.Id,
      name: product.Name,
      description: product.Description,
      createdDate: product.CareatedDate,
    } as Product;
  }

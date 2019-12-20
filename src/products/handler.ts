import { ILogger } from './../shared/abstract/util/logger';
import { Product } from './../shared/models/product';
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import 'source-map-support/register';
import { wpoContainer, TYPES } from '../../inversify.config';
import { IProductRepository } from '../shared/abstract/repos/product.repository.interface';
import { ProductService } from './lib/product.service';
import { getProductsByUser as Validator } from './validators';
import { handleError } from '../shared/util/errorHandler';
import { ok } from '../shared/util/responseHandler';

const productsRepository = wpoContainer.get<IProductRepository>(
TYPES.ProductRepository,
);
const logger = wpoContainer.get<ILogger>(TYPES.Logger);

export const getProductsByUser: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  _context,
) => {
  const productService = new ProductService(productsRepository);
  const { headers } = event;
  const { token } = headers;
  let result: Product[] = [];
  try {
    await Validator(token);
    result = await productService.getProductsByUser(Number(token));
    return ok(result);
  } catch (err) {
    logger.log(err.name, err);
    return handleError(err);
  }
};

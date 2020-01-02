import API from 'lambda-api';
import 'source-map-support/register';
import { wpoContainer, TYPES } from '../../inversify.config';
import { IProductRepository } from '../shared/abstract/repos/product.repository.interface';
import { IPhaseRepository } from '../shared/abstract/repos/phase.repository.interface';
import { ProductService } from './services/product.service';
import { resolveIdentity } from '../shared/util/identityHandler';

const productsRepository = wpoContainer.get<IProductRepository>(
  TYPES.ProductRepository,
);
const phaseRepository = wpoContainer.get<IPhaseRepository>(
  TYPES.PhaseRepository,
);

const productService = new ProductService(productsRepository, phaseRepository);

export const path = API({ version: 'v1.0', base: 'products', logger: true });

path.get('/', async (req, _res) => {
  const identity = resolveIdentity(req);
  return await productService.getProductsByUser(identity.userId);
});

path.get('/:id', async (req, _res) => {
  const productId = Number(req.pathParameters ? req.pathParameters.id : null);
  return await productService.getProductById(productId);
});

path.get('/:id/phases', async (req, _res) => {
  const productId = Number(req.pathParameters ? req.pathParameters.id : null);
  return await productService.getPhases(productId);
});

path.get('/productPhases/:id', async (req, _res) => {
  const productId = Number(req.pathParameters ? req.pathParameters.id : null);
  return await productService.getProductByProductPhaseId(productId);
});

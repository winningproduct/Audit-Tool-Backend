import API from 'lambda-api';
import 'source-map-support/register';
import { wpoContainer, TYPES } from '@root/inversify.config';
import { IProductRepository } from '@repos/product.repository.interface';
import { IPhaseRepository } from '@repos/phase.repository.interface';
import { ProductService } from './products/services/product.service';
import { resolveIdentity } from '@util/identityHandler';
import { KnowledgeAreaService } from './knowledge-areas/services/knowledge-area.service';
import { IKnowledgeAreaRepository } from '@repos/knowledge-area.repository';

const productsRepository = wpoContainer.get<IProductRepository>(
  TYPES.ProductRepository,
);
const phaseRepository = wpoContainer.get<IPhaseRepository>(
  TYPES.PhaseRepository,
);

const knowledgeAreaRepository = wpoContainer.get<IKnowledgeAreaRepository>(
  TYPES.KnowledgeAreaRepository,
);

const knowledgeAreaService = new KnowledgeAreaService(knowledgeAreaRepository);

const productService = new ProductService(productsRepository, phaseRepository);

export const path = API({ version: 'v1.0', logger: true });

path.get('products/', async (req, _res) => {
  const identity = resolveIdentity(req);
  return await productService.getProductsByUser(identity.userId);
});

path.get('products/:id', async (req, _res) => {
  const productId = Number(req.pathParameters ? req.pathParameters.id : null);
  return await productService.getProductById(productId);
});

path.get('products/:id/phases', async (req, _res) => {
  const productId = Number(req.pathParameters ? req.pathParameters.id : null);
  return await productService.getPhases(productId);
});

path.get('products/productPhases/:id', async (req, _res) => {
  const productId = Number(req.pathParameters ? req.pathParameters.id : null);
  return await productService.getProductByProductPhaseId(productId);
});

path.get('productPhase/:id/knowledgeAreas', async (req, _res) => {
  const productId = Number(req.pathParameters ? req.pathParameters.id : null);
  return await knowledgeAreaService.getKnowledgeAreaByPhase(productId);
});

import { KnowledgeAreaService } from './knowledge-areas/services/knowledge-area.service';
import { IKnowledgeAreaService } from './knowledge-areas/interfaces/knowledge-area.service.interface';
import { IProductService } from './products/interfaces/product.service.interface';
import API from 'lambda-api';
import 'source-map-support/register';
import { wpoContainer } from '@root/inversify.config';
import { ProductService } from './products/services/product.service';
import { resolveIdentity } from '@util/identityHandler';

const knowledgeAreaService: IKnowledgeAreaService = wpoContainer.resolve<
  IKnowledgeAreaService
>(KnowledgeAreaService);

const productService: IProductService = wpoContainer.resolve<IProductService>(
  ProductService,
);

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

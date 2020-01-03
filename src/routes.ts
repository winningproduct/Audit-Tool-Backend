import { ProductService } from '@products/services/product.service';
import { Inversify } from './../inversify.config';
import { IProductService } from './products/interfaces/product.service.interface';
import API from 'lambda-api';
import 'source-map-support/register';
import { resolveIdentity } from '@util/identityHandler';
import { IKnowledgeAreaService } from 'knowledge-areas/interfaces/knowledge-area.service.interface';
import { injectable } from 'inversify';

const productService: IProductService = Inversify.getProductService();

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

// path.get('productPhase/:id/knowledgeAreas', async (req, _res) => {
//   const productId = Number(
//     req.pathParameters ? req.pathParameters.id : null,
//   );
//   return await knowledgeAreaService.getKnowledgeAreaByPhase(productId);
// });

// @injectable()
// export class Routes {
//   path = API({ version: 'v1.0', logger: true });
//   // private productService: IProductService;
//   private knowledgeAreaService: IKnowledgeAreaService;
//   constructor() {
//     this.knowledgeAreaService = Inversify.getKnowledgeAreaService();
//     this.path.get('products/', async (req, _res) => {
//       const identity = resolveIdentity(req);
//       return await productService.getProductsByUser(identity.userId);
//     });

//     this.path.get('products/:id', async (req, _res) => {
//       const productId = Number(
//         req.pathParameters ? req.pathParameters.id : null,
//       );
//       return await productService.getProductById(productId);
//     });

//     this.path.get('products/:id/phases', async (req, _res) => {
//       const productId = Number(
//         req.pathParameters ? req.pathParameters.id : null,
//       );
//       return await productService.getPhases(productId);
//     });

//     this.path.get('products/productPhases/:id', async (req, _res) => {
//       const productId = Number(
//         req.pathParameters ? req.pathParameters.id : null,
//       );
//       return await productService.getProductByProductPhaseId(productId);
//     });

//     this.path.get('productPhase/:id/knowledgeAreas', async (req, _res) => {
//       const productId = Number(
//         req.pathParameters ? req.pathParameters.id : null,
//       );
//       return await this.knowledgeAreaService.getKnowledgeAreaByPhase(productId);
//     });
//   }

//   getPath() {
//     return this.path;
//   }
// }

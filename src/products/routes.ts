import * as controller from './controllers/product.controller';

export const routeRegistrations = [
  {
    signature: '/products',
    getAction: () => {
      return controller.getProductsByUser;
    },
  },
  {
    signature: '/products/{id}',
    getAction: () => {
      return controller.getProductById;
    },
  },
  {
    signature: '/products/{id}/phases',
    getAction: () => {
      return controller.getPhases;
    },
  },
  {
    signature: '/products/productPhases/{id}',
    getAction: () => {
      return controller.getKnowledgeAreasByProductPhaseId;
    },
  },
];

import { APIGatewayProxyEvent } from 'aws-lambda';
import * as controller from './controllers/product.controller';

export function handleRoutes(event: APIGatewayProxyEvent) {
    const registrations = [
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
<<<<<<< HEAD
          return controller.getProductByProductPhaseId;
=======
          return controller.getPhases;
>>>>>>> master
        },
      },
      {
        signature: '/products/productPhases/{id}',
        getAction: () => {
          return controller.getKnowledgeAreasByProductPhaseId;
        },
      },
    ];
    const path = event.path;

    const pathSplit = path.split('/');

    const isParameter = (p: any) => {
      const result = p[0] === '{' && p[p.length - 1] === '}';
      /// console.log(p + ' is ' + result);
      return result;
    };
    let matchRoute = null;
    // searching for the matching path
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < registrations.length; i++) {
      let isRouteMatch = true;
      const registration = registrations[i];
      const regSplit = registration.signature.split('/');
      if (regSplit.length === pathSplit.length) {
        // tslint:disable-next-line: prefer-for-of
        for (let j = 0; j < regSplit.length; j++) {
          if (!isParameter(regSplit[j])) {
            if (pathSplit[j] !== regSplit[j]) {
              isRouteMatch = false;
            }
          }
        }
      } else {
        isRouteMatch = false;
      }
      if (isRouteMatch) {
        matchRoute = registration;
        break;
      }
    }
    return {
      match: matchRoute,
    };
  }

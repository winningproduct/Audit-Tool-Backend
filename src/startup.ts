import 'reflect-metadata';
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
// import { path } from './routes';
import { Routes } from './routes';
import { handleError } from '@util/errorHandler';
import { ok } from '@util/responseHandler';
import { Inversify } from '@root/inversify.config';

export const enrtyPoint: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  _context,
) => {
  try {
    const inversifyContainer = new Inversify();
    const productService = inversifyContainer.getProductService();
    const knowledgeAreaService = inversifyContainer.getKnowledgeAreaService();
    const path = new Routes(knowledgeAreaService, productService).getPath();
    const result = await path.run(event, _context);
    inversifyContainer.destroyContainer();
    return ok(result);
  } catch (err) {
    console.log(err);
    return handleError(err);
  }
};

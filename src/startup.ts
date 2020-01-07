import 'reflect-metadata';
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { Routes } from './routes';
import { handleError } from '@util/errorHandler';
import { ok } from '@util/responseHandler';
import { Inversify } from '@root/inversify.config';

export const enrtyPoint: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  _context,
) => {
  const inversifyContainer = new Inversify();
  const productService = inversifyContainer.getProductService();
  const knowledgeAreaService = inversifyContainer.getKnowledgeAreaService();
  const evidenceService = inversifyContainer.getEvidenceService();
  const logger = inversifyContainer.getLogger();
  const path = new Routes(
    knowledgeAreaService,
    productService,
    evidenceService,
  ).getPath();
  try {
    const result = await path.run(event, _context);
    return ok(result);
  } catch (err) {
    return handleError(err, logger);
  } finally {
    inversifyContainer.destroyContainer();
  }
};

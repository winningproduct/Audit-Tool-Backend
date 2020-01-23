import 'reflect-metadata';
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { Routes } from './routes';
import { handleError } from '@util/errorHandler';
import { ok } from '@util/responseHandler';
import { Inversify } from '@root/inversify.config';

export const enrtyPoint: APIGatewayProxyHandler = async (
  event: any,
  _context,
) => {
  const inversifyContainer = new Inversify();
  const productService = inversifyContainer.getProductService();
  const questionService = inversifyContainer.getQuestionService();
  const knowledgeAreaService = inversifyContainer.getKnowledgeAreaService();
  const evidenceService = inversifyContainer.getEvidenceService();
  const organizationService = inversifyContainer.getOrganizationService();
  const userService = inversifyContainer.getUserService();
  const logger = inversifyContainer.getLogger();
  const path = new Routes(
    knowledgeAreaService,
    productService,
    evidenceService,
    questionService,
    organizationService,
    userService,
  ).getPath();
  try {
    const eventPolifil = { ...event, path: event.requestPath };
    const result = await path.run(eventPolifil, _context);
    return ok(result);
  } catch (err) {
    return handleError(err, logger);
  } finally {
    inversifyContainer.destroyContainer();
  }
};

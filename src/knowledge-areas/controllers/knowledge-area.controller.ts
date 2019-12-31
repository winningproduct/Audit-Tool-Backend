import { handleError } from '../../shared/util/errorHandler';
import { ok } from '../../shared/util/responseHandler';
import { KnowledgeArea } from '../../shared/models/knowledge-area';
import { ILogger } from '../../shared/abstract/util/logger';
import 'source-map-support/register';
import { wpoContainer, TYPES } from '../../../inversify.config';
import { IKnowledgeAreaRepository } from '../../shared/abstract/repos/knowledge-area.repository';
import { KnowledgeAreaService } from '../business-logic/knowledge-area.service';
import { APIGatewayProxyResult } from 'aws-lambda';

const knowledgeAreaRepository = wpoContainer.get<IKnowledgeAreaRepository>(
  TYPES.KnowledgeAreaRepository,
);

const knowledgeAreaService = new KnowledgeAreaService(knowledgeAreaRepository);
const logger = wpoContainer.get<ILogger>(TYPES.Logger);

export const getKnowledgeAreaByPhase = async (
  event: any,
): Promise<APIGatewayProxyResult> => {
  const phaseId = Number(event.pathParameters ? event.pathParameters.id : null);
  let result: KnowledgeArea[] = [];
  try {
    result = await knowledgeAreaService.getKnowledgeAreaByPhase(phaseId);
    return ok(result);
  } catch (err) {
    logger.log(err.name, err);
    return handleError(err);
  }
};

import { KnowledgeAreaService } from './services/knowledge-area.service';
import { IKnowledgeAreaRepository } from './../shared/abstract/repos/knowledge-area.repository';
import API from 'lambda-api';
import 'source-map-support/register';
import { wpoContainer, TYPES } from '../../inversify.config';

const knowledgeAreaRepository = wpoContainer.get<IKnowledgeAreaRepository>(
  TYPES.KnowledgeAreaRepository,
);

const knowledgeAreaService = new KnowledgeAreaService(knowledgeAreaRepository);

export const path = API({
  version: 'v1.0',
  base: 'productPhase',
  logger: true,
});

path.get('/:id/knowledgeAreas', async (req, _res) => {
  const productId = Number(req.pathParameters ? req.pathParameters.id : null);
  return await knowledgeAreaService.getKnowledgeAreaByPhase(productId);
});

import * as controller from './controllers/knowledge-area.controller';

export const routeRegistrations = [
  {
    signature: '/products/{productId}/phases/{phaseId}/knowledgeAreas',
    getAction: () => {
      return controller.getKnowledgeAreaByPhase;
    },
  }
];

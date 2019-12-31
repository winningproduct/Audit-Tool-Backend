import * as controller from './controllers/knowledge-area.controller';

export const routeRegistrations = [
  {
    signature: '/productPhase/{id}/knowledgeAreas',
    getAction: () => {
      return controller.getKnowledgeAreaByPhase;
    },
  },
];

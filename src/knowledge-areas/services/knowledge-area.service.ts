import { IKnowledgeAreaRepository } from '@repos/knowledge-area.repository';

export class KnowledgeAreaService {
  constructor(private _knowledgeAreaRepository: IKnowledgeAreaRepository) {}

  async getKnowledgeAreaByPhase(phaseId: number) {
    return await this._knowledgeAreaRepository.getKnowledgeAreasByProductPhaseId(
      phaseId,
    );
  }
}

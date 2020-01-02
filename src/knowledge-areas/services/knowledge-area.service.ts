import { IKnowledgeAreaRepository } from '@repos/knowledge-area.repository';
import {IKnowledgeAreaService} from '../interfaces/knowledge-area.service.interface'
export class KnowledgeAreaService implements IKnowledgeAreaService{
  constructor(private _knowledgeAreaRepository: IKnowledgeAreaRepository) {}

  async getKnowledgeAreaByPhase(phaseId: number) {
    return await this._knowledgeAreaRepository.getKnowledgeAreasByProductPhaseId(
      phaseId,
    );
  }
}

import { IKnowledgeAreaRepository } from '@repos/knowledge-area.repository';
import { IKnowledgeAreaService } from '../interfaces/knowledge-area.service.interface';
import { injectable, inject } from 'inversify';
import { TYPES } from '@root/inversify.config';
@injectable()
export class KnowledgeAreaService implements IKnowledgeAreaService {
  protected knowledgeAreaRepository: IKnowledgeAreaRepository;

  constructor(
    @inject(TYPES.KnowledgeAreaRepository)
    _knowledgeAreaRepository: IKnowledgeAreaRepository,
  ) {
    this.knowledgeAreaRepository = _knowledgeAreaRepository;
  }

  async getKnowledgeAreaByPhase(phaseId: number) {
    return await this.knowledgeAreaRepository.getKnowledgeAreasByProductPhaseId(
      phaseId,
    );
  }
}

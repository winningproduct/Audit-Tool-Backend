import { Evidence } from '@models/evidence';

export interface IEvidenceService {
  getEvidenceByProjectIdAndQuestionId(
    projectId: number,
    questionId: number,
  ): Promise<Evidence[]>;

  addEvidenceByQuestionId(
    _questionId: number,
    _evidence: Evidence,
  ): Promise<boolean>;
}

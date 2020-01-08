import { IRepository } from './repository.interface';
import { Evidence } from '@models/evidence';

export interface IEvidenceRepository extends IRepository<Evidence> {
  getEvidenceByProjectIdAndQuestionId(
    productId: number,
    questionId: number,
  ): Promise<Evidence[]>;

  addEvidenceByQuestionId(
    _questionId: number,
    _evidence: Evidence,
  ): Promise<boolean>;
}

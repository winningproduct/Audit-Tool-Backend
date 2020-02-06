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

  updateStatus(_evidenceId: number, _status: string): Promise<boolean>;

  getVersions(
    _userId: number,
    _productId: number,
    _questionId: number,
  ): Promise<Evidence[]>;
}

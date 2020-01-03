import { IRepository } from './repository.interface';
import { Phase } from '../../models//phase';

export interface IPhaseRepository extends IRepository<Phase> {
  getPhases(productId: number): Promise<Phase[]>;
}

import { Phase } from './../../../models/phase';
import { IPhaseRepository } from '../../../abstract/repos/phase.repository.interface';
import { injectable } from 'inversify';
import { initMysql } from './connection.manager';

@injectable()
export class MYSQLPhaseRepository implements IPhaseRepository {

  async getPhases(productId:number): Promise<Phase[]>{
    let connection: any;
    let result: Phase[] = [];
    try {
      connection = await initMysql();
      const types = await connection.query(`CALL GetPhases(${productId})`);
      result = types[0].map( (phase: any) => {
        return {productPhaseId: phase.Id,
                phaseId: phase.PhaseId,
                name: phase.Name,
                description: phase.Description,
                score: phase.Score} as Phase ;
      });
      return result;
    } catch (err) {
      throw err;
    } finally {
      if ( connection != null) {
        await connection.close();
      }
    }
    return result;
  }

  get(_itemId: number): Phase {
    throw new Error('Method not implemented.');
  }
  add(_item: import('../../../models/phase').Phase) {
    throw new Error('Method not implemented.');
  }
  update(_itemId: number, _item: import('../../../models/phase').Phase) {
    throw new Error('Method not implemented.');
  }
  delete(_itemId: number) {
    throw new Error('Method not implemented.');
  }
}

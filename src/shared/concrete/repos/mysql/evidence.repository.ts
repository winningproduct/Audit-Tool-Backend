import { IEvidenceRepository } from '../../../abstract/repos/evidence.repository';
import { initMysql } from './connection.manager';
import { mapDbItems, evidenceMapper } from './dbMapper';
import { Evidence } from '@models/evidence';
import { injectable } from 'inversify';

@injectable()
export class MySQLEvidenceRepository implements IEvidenceRepository {
  async getEvidenceByProjectIdAndQuestionId(
    _productId: number,
    _questionId: number,
  ): Promise<Evidence[]> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection.query(
        `CALL GetEvidenceByProjectIdAndQuestionId(${_productId} , ${_questionId})`,
      );
      return mapDbItems(result, evidenceMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  async addEvidenceByQuestionId(
    _questionId: number,
    _evidence: Evidence,
  ): Promise<Evidence[]> {
    let connection: any;
    const productId = _evidence.productId;
    const userId = _evidence.userId;
    const content = _evidence.content;
    const status = _evidence.status;
    const version = _evidence.version;
    try {
      connection = await initMysql();
      const result = await connection.query(
        `CALL AddEvidenceByQuestionId(${productId} , ${_questionId} , ${userId} , ${content} , ${status} , ${version})`,
      );
      return mapDbItems(result, evidenceMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  get(_itemId: number): Evidence {
    throw new Error('Method not implemented.');
  }
  add(_item: Evidence) {
    throw new Error('Method not implemented.');
  }
  update(_itemId: number, _item: Evidence) {
    throw new Error('Method not implemented.');
  }
  delete(_itemId: number) {
    throw new Error('Method not implemented.');
  }
}

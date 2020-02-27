import { Phase } from './../../../models/phase';
import { IPhaseRepository } from '../../../abstract/repos/phase.repository.interface';
import { injectable } from 'inversify';
import { initMysql } from './connection.manager';
import { mapDbItems, phasesMapper, phaseScoreMapper } from './dbMapper';
import { ProductPhase } from './entity/product_phase';

@injectable()
export class MYSQLPhaseRepository implements IPhaseRepository {
  async getPhases(productId: number): Promise<Phase[]> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection
        .getRepository(ProductPhase)
        .createQueryBuilder('product_phase')
        .leftJoinAndSelect('product_phase.phase', 'phases')
        .where('product_phase.productId = :productId', { productId })
        .getRawMany();
      return mapDbItems(result, phasesMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  async getPhaseByProductPhaseId(productPhaseId: number): Promise<Phase[]> {
    let connection: any;
    let result: Phase;
    try {
      connection = await initMysql();
      result = await connection
        .getRepository(ProductPhase)
        .createQueryBuilder('product_phase')
        .leftJoinAndSelect('product_phase.phase', 'phases')
        .where('product_phase.id = :productPhaseId', { productPhaseId })
        .getRawMany();
      return mapDbItems(result, phasesMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  async getQuestionCount(productId: number, phaseId: number): Promise<any> {
    let connection: any;
    try {
      connection = await initMysql();
      const result1 = await connection.query(
        `SELECT 
          K.id as KnowledgeId, 
          Count(*) AS AnswerCount
        FROM 
          auditDb.Evidence E,
          auditDb.Question Q, 
          auditDb.KnowledgeArea K 
        WHERE 
          Q.id =  E.questionId AND 
          K.id =  Q.knowledgeAreaId AND 
          E.id IN (
            SELECT MAX(E.id) FROM auditDb.Evidence AS E WHERE E.productId = ${productId} group by E.questionId)
          AND E.status != 'null'
        group by (K.id)`,
      );

      const result2 = await connection.query(
        `SELECT 
          K.id as KnowledgeId, 
          Count(*) AS QuestionCount
        FROM 
          auditDb.Phase P, 
          auditDb.KnowledgeArea K, 
          auditDb.Question Q
        WHERE 
          P.id = K.phaseId AND 
          K.id = Q.knowledgeAreaId AND 
          P.id = ${phaseId} 
        group by K.id;`,
      );

      return phaseScoreMapper(result1, result2);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
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

import { initMysql } from './connection.manager';
import { mapDbItems, questionMapper } from './dbMapper';
import { IQuestionRepository } from '../../../abstract/repos/question.repository';
import { injectable } from 'inversify';
@injectable()
export class MySQLQuestionRepository implements IQuestionRepository {
  async getQuestionsByKnowledgeAreaId(
    _knowledgeAreaId: number,
  ): Promise<Array<import('../../../models/question').Question>> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection.query(
        `CALL GetQuestionsByKnowledgeAreaId(${_knowledgeAreaId})`,
      );
      return mapDbItems(result, questionMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }
  get(_itemId: number): import('../../../models/question').Question {
    throw new Error('Method not implemented.');
  }
  add(_item: import('../../../models/question').Question) {
    throw new Error('Method not implemented.');
  }
  update(_itemId: number, _item: import('../../../models/question').Question) {
    throw new Error('Method not implemented.');
  }
  delete(_itemId: number) {
    throw new Error('Method not implemented.');
  }
}

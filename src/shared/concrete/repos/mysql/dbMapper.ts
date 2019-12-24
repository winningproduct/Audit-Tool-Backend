import { Product } from '../../../models/product';
import { KnowledgeArea } from '../../../models/knowledge-area';
import { Question } from '../../../models/question';

export function mapDbItems<T>(result: any, mapper: any): T {
    return result[0].map((product: any) => {
      return mapper(product);
    });
  }
export function productMapper(product: any): Product {
      return {
        id: product.Id,
        name: product.Name,
        description: product.Description,
        createdDate: product.CareatedDate,
      } as Product;
    }
export function knowledgeAreaMapper(product: any): KnowledgeArea {
            return {
              id: product.Id,
              phaseId: product.PhaseId,
              name: product.Name,
              description: product.Description,
              score: product.Score,
            } as KnowledgeArea;
          }

export function questionMapper(product: any): Question {
            return {
              id: product.Id,
              knowledgeAreaId: product.KnowledgeAreaId,
              revisionId: product.RevisionId,
              userId: product.UserId,
              title: product.Title,
              description: product.Description,
              version: product.Version,
              createdDate: product.CreatedDate,
            } as Question;
          }

import { Product } from '../../../models/product';
import { KnowledgeArea } from '../../../models/knowledge-area';
import { Question } from '../../../models/question';
import { Phase } from '../../../models/phase';
import { Evidence } from '@models/evidence';
import { User } from '@models/user';

export function mapDbItems<T>(result: any, mapper: any): T {
  return result[0].product.map((product: any) => {
    return mapper(product);
  });
}
export function productMapper(product: any): Product {
  return {
    id: product.Id,
    name: product.Name,
    description: product.Description,
    createdDate: product.CreatedDate,
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

export function phasesMapper(phase: any): Phase {
  return {
    id: phase.Id,
    productPhaseId: phase.Id,
    phaseId: phase.PhaseId,
    name: phase.Name,
    description: phase.Description,
    score: phase.Score,
  } as Phase;
}

export function evidenceMapper(evidence: any): Evidence {
  return {
    id: evidence.Id,
    content: evidence.Content,
    status: evidence.Status,
    version: evidence.Version,
    createdDate: evidence.CreatedDate,
  } as Evidence;
}

export function userMapper(user: any): User {
  return {
    id: user.Id,
    organizationId: user.OrganizationId,
    firstName: user.FirstName,
    lastName: user.LastName,
    phoneNumber: user.PhoneNumber,
    createdDate: user.CreatedDate,
  } as User;
}

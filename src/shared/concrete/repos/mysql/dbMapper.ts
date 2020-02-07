import { Product } from '../../../models/product';
import { KnowledgeArea } from '../../../models/knowledge-area';
import { Question } from '../../../models/question';
import { Phase } from '../../../models/phase';
import { Evidence } from '@models/evidence';
import { User } from '@models/user';

export function mapDbItems(result: any, mapper: any): any {
  return Object.keys(result).map(key => {
    return mapper(result[key]);
  });
}
export function productMapper(product: any): Product {
  return {
    id: product.products_Id,
    name: product.products_Name,
    description: product.products_Description,
    createdDate: product.products_CreatedDate,
  } as Product;
}
export function knowledgeAreaMapper(product: any): KnowledgeArea {
  return {
    id: product.knowledgearea_Id,
    phaseId: product.knowledgearea_PhaseId,
    name: product.knowledgearea_Name,
    description: product.knowledgearea_Description,
    score: product.knowledgearea_Score,
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
    id: phase.product_phase_Id,
    productPhaseId: phase.product_phase_Id,
    phaseId: phase.phases_Id,
    name: phase.phases_Name,
    description: phase.phases_Description,
    score: phase.product_phase_Score,
  } as Phase;
}

export function evidenceMapper(evidence: any): Evidence {
  return {
    id: evidence.evidence_Id,
    content: evidence.evidence_Content,
    status: evidence.evidence_Status,
    version: evidence.evidence_Version,
    createdDate: evidence.evidence_CreatedDate,
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

import { Product } from '../../../models/product';
import { KnowledgeArea } from '../../../models/knowledge-area';
import { Question } from '../../../models/question';
import { Phase } from '../../../models/phase';
import { User } from '@models/user';

export function mapDbItems(result: any, mapper: any): any {
  return Object.keys(result).map(key => {
    return mapper(result[key]);
  });
}
export function productMapper(product: any): Product {
  return {
    id: product.products_id,
    name: product.products_name,
    description: product.products_description,
    createdDate: product.products_createdDate,
  } as Product;
}
export function knowledgeAreaMapper(knowledgeArea: any): KnowledgeArea {
  return {
    id: knowledgeArea.knowledgeArea_id,
    phaseId: knowledgeArea.kknowledgeArea_phaseId,
    name: knowledgeArea.knowledgeArea_name,
    description: knowledgeArea.knowledgeArea_description,
    score: knowledgeArea.knowledgeArea_score,
  } as KnowledgeArea;
}

export function questionMapper(question: any): Question {
  return {
    id: question.question_id,
    knowledgeAreaId: question.question_knowledgeAreaId,
    revisionId: question.question_revisionId,
    userId: question.question_userId,
    title: question.question_title,
    description: question.question_description,
    version: question.question_version,
    createdDate: question.question_createdDate,
  } as Question;
}

export function phasesMapper(phase: any): Phase {
  return {
    id: phase.product_phase_id,
    productPhaseId: phase.product_phase_id,
    phaseId: phase.phases_id,
    name: phase.phases_name,
    description: phase.phases_description,
    score: phase.product_phase_score,
  } as Phase;
}

export function evidenceMapper(evidence: any) {
  return {
    id: evidence.evidence_id,
    content: evidence.evidence_content,
    status: evidence.evidence_status,
    version: evidence.evidence_version,
    createdDate: evidence.evidence_createdDate,
    firstName: evidence.users_firstName,
    email: evidence.users_email,
    lastName: evidence.users_lastName,
  };
}

export function userMapper(user: any): User {
  return {
    id: user.users_id,
    organizationId: user.users_organizationId,
    firstName: user.users_firstName,
    lastName: user.users_lastName,
    phoneNumber: user.users_phoneNumber,
    createdDate: user.users_createdDate,
  } as User;
}

export function domainMapper(org: any) {
  return {
    organizationId: org.domain_organizationId,
  };
}

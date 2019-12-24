import { ILogger } from './../shared/abstract/util/logger';
import { Product } from './../shared/models/product';
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import 'source-map-support/register';
import { wpoContainer, TYPES } from '../../inversify.config';
import { IProductRepository } from '../shared/abstract/repos/product.repository.interface';
import { IPhaseRepository } from '../shared/abstract/repos/phase.repository.interface';
import { ProductService } from './business-logic/product.service';
import ProductValidator from './validators';
import { handleError } from '../shared/util/errorHandler';
import { ok } from '../shared/util/responseHandler';
import { resolveIdentity } from '../shared/util/identityHandler';
import { Phase } from '../shared/models/phase';

const productsRepository = wpoContainer.get<IProductRepository>(
  TYPES.ProductRepository,
);
const phaseRepository = wpoContainer.get<IPhaseRepository>(
  TYPES.PhaseRepository,
);

const productService = new ProductService(productsRepository, phaseRepository);
const logger = wpoContainer.get<ILogger>(TYPES.Logger);
const productValidator = new ProductValidator();

// GET PRODUCTS
export const getProductsByUser: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  _context,
) => {
  const identity = resolveIdentity(event);
  let result: Product[] = [];
  try {
    await productValidator.getProductsByUser(identity.userId);
    result = await productService.getProductsByUser(identity.userId);
    return ok(result);
  } catch (err) {
    logger.log(err.name, err);
    return handleError(err);
  }
};

// GET PHASES OF A PRODUCT
export const getPhases: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  _context,
) => {
  const { path } = event ;
  const productId = Number(path.split('/')[2]);
  let result: Phase[] = [];
  try {
    await productValidator.getPhases(productId);
    result = await productService.getPhases(productId);
    return ok(result);
  } catch (err) {
    logger.log(err.name, err);
    return handleError(err);
  }
};

// GET PRODUCT BY PRODUCT_PHASE_ID
export const getProductByProductPhaseId: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  _context,
) => {
  let result: Product;
  try {
    const productPhaseId = Number(event.pathParameters ? event.pathParameters.id : null);
    await productValidator.getProductByProductPhaseId(productPhaseId);
    result = await productService.getProductByProductPhaseId(productPhaseId);
    return ok(result);
  } catch (err) {
    logger.log(err.name, err);
    return handleError(err);
  }
};

// GET KNOWLEDGE AREAS BY PRODUCT_PHASE_ID
export const getKnowledgeAreasByProductPhaseId: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  _context,
) => {
  let result: Product;
  try {
    throw new Error('NOT IMPLEMENTED');
  } catch (err) {
    logger.log(err.name, err);
    return handleError(err);
  }
};

// GET QUESTIONS BY KNOWLEDGE AREA ID
export const getQuestionsByKnowledgeAreaId: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  _context,
) => {
  let result: Product;
  try {
    throw new Error('NOT IMPLEMENTED');
  } catch (err) {
    logger.log(err.name, err);
    return handleError(err);
  }
};

// GET PRODUCT BY PRODUCT ID
export const getProductById: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  _context,
) => {
  let result: Product;
  const productId = Number(event.pathParameters ? event.pathParameters.id : null);
  try {
    await productValidator.getProductById(productId);
    result = await productService.getProductById(productId);
    return ok(result);
  } catch (err) {
    logger.log(err.name, err);
    return handleError(err);
  }
};

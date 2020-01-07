import { IProductService } from './products/interfaces/product.service.interface';
import API from 'lambda-api';
import 'source-map-support/register';
import { resolveIdentity } from '@util/identityHandler';
import { IKnowledgeAreaService } from 'knowledge-areas/interfaces/knowledge-area.service.interface';
import { injectable, inject } from 'inversify';
import { TYPES } from 'shared/constants/Types';
import { IQuestionService } from '@questions/interfaces/question.service.interface';

@injectable()
export class Routes {
  private path = API({ version: 'v1.0', logger: true });
  private productService: IProductService;
  private knowledgeAreaService: IKnowledgeAreaService;
  private questionService: IQuestionService;

  constructor(
    @inject(TYPES.KnowledgeAreaService)
    _knowledgeAreaService: IKnowledgeAreaService,
    @inject(TYPES.ProductService)
    _productService: IProductService,
    @inject(TYPES.QuestionService)
    _questionService: IQuestionService,
  ) {
    this.productService = _productService;
    this.knowledgeAreaService = _knowledgeAreaService;
    this.questionService = _questionService;
    this.initiateApi();
  }
  initiateApi() {
    this.path.get('products/', async (req, _res) => {
      const identity = resolveIdentity(req);
      return await this.productService.getProductsByUser(identity.userId);
    });

    this.path.get('products/:id', async (req, _res) => {
      const productId = Number(
        req.pathParameters ? req.pathParameters.id : null,
      );
      return await this.productService.getProductById(productId);
    });

    this.path.get('products/:id/phases', async (req, _res) => {
      const productId = Number(
        req.pathParameters ? req.pathParameters.id : null,
      );
      return await this.productService.getPhases(productId);
    });

    this.path.get('products/productPhases/:id', async (req, _res) => {
      const productId = Number(
        req.pathParameters ? req.pathParameters.id : null,
      );
      return await this.productService.getProductByProductPhaseId(productId);
    });

    this.path.get('productPhase/:id/knowledgeAreas', async (req, _res) => {
      const productId = Number(
        req.pathParameters ? req.pathParameters.id : null,
      );
      return await this.knowledgeAreaService.getKnowledgeAreaByPhase(productId);
    });

    this.path.get(
      'knowledgeAreas/:knowledgeAreaId/questions',
      async (req, _res) => {
        const knowledgeAreaId = Number(
          req.pathParameters ? req.pathParameters.knowledgeAreaId : null,
        );
        return await this.questionService.getQuestionsByKnowledgeArea(
          knowledgeAreaId,
        );
      },
    );
  }

  getPath() {
    return this.path;
  }
}

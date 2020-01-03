import 'reflect-metadata';
import { KnowledgeAreaService } from './src/knowledge-areas/services/knowledge-area.service';
import { TYPES } from 'shared/constants/Types';
import { IProductService } from 'products/interfaces/product.service.interface';
import { ConsoleLogger } from './src/shared/concrete/util/console.logger';
import { ILogger } from './src/shared/abstract/util/logger';
import { Container } from 'inversify';
import { IOrganizationRepository } from './src/shared/abstract/repos/organization.repository.interface';
import { IProductRepository } from './src/shared/abstract/repos/product.repository.interface';
import { IPhaseRepository } from './src/shared/abstract/repos/phase.repository.interface';
import { IKnowledgeAreaRepository } from './src/shared/abstract/repos/knowledge-area.repository';
import { MySQLProductRepository } from './src/shared/concrete/repos/mysql/product.repository';
import { MySQLOrganizationRepository } from './src/shared/concrete/repos/mysql/organization.repository';
import { MYSQLPhaseRepository } from './src/shared/concrete/repos/mysql/phase.repository';
import { MySQLKnowledgeAreaRepository } from './src/shared/concrete/repos/mysql/knowledge-area.repository';
import { ProductService } from '@products/services/product.service';
import { IKnowledgeAreaService } from 'knowledge-areas/interfaces/knowledge-area.service.interface';

export class Inversify {
  static config = new Container();

  static getContainer() {
    Inversify.config.bind<ILogger>(TYPES.Logger).to(ConsoleLogger);
    Inversify.config
      .bind<IOrganizationRepository>(TYPES.OrganizationRepository)
      .to(MySQLOrganizationRepository);
    Inversify.config
      .bind<IProductRepository>(TYPES.ProductRepository)
      .to(MySQLProductRepository);
    Inversify.config
      .bind<IPhaseRepository>(TYPES.PhaseRepository)
      .to(MYSQLPhaseRepository);
    Inversify.config
      .bind<IKnowledgeAreaRepository>(TYPES.KnowledgeAreaRepository)
      .to(MySQLKnowledgeAreaRepository);
    return Inversify.config;
  }

  static initializeContainer() {
    Inversify.config.bind<ILogger>(TYPES.Logger).to(ConsoleLogger);
    Inversify.config
      .bind<IOrganizationRepository>(TYPES.OrganizationRepository)
      .to(MySQLOrganizationRepository);
    Inversify.config
      .bind<IProductRepository>(TYPES.ProductRepository)
      .to(MySQLProductRepository);
    Inversify.config
      .bind<IPhaseRepository>(TYPES.PhaseRepository)
      .to(MYSQLPhaseRepository);
    Inversify.config
      .bind<IKnowledgeAreaRepository>(TYPES.KnowledgeAreaRepository)
      .to(MySQLKnowledgeAreaRepository);
  }

  static getProductService() {
    Inversify.config
      .bind<IProductRepository>(TYPES.ProductRepository)
      .to(MySQLProductRepository);
    Inversify.config
      .bind<IPhaseRepository>(TYPES.PhaseRepository)
      .to(MYSQLPhaseRepository);
    return Inversify.config.resolve<IProductService>(ProductService);
  }

  static getKnowledgeAreaService() {
    Inversify.config
      .bind<IKnowledgeAreaRepository>(TYPES.KnowledgeAreaRepository)
      .to(MySQLKnowledgeAreaRepository);
    return Inversify.config.resolve<IKnowledgeAreaService>(
      KnowledgeAreaService,
    );
  }

  static destroyContainer() {
    Inversify.config.unbindAll();
  }
}

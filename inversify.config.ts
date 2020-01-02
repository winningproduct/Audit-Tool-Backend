import 'reflect-metadata';
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

// type spec
const TYPES = {
  OrganizationRepository: Symbol.for('OrganizationRepository'),
  Logger: Symbol.for('Logger'),
  ProductRepository: Symbol.for('ProductRepository'),
  UserRepository: Symbol.for('UserRepository'),
  PhaseRepository: Symbol.for('PhaseRepository'),
  KnowledgeAreaRepository: Symbol.for('KnowledgeAreaRepository'),
};

export { TYPES };
// type bindings
const wpoContainer = new Container();

wpoContainer.bind<ILogger>(TYPES.Logger).to(ConsoleLogger);

wpoContainer
  .bind<IOrganizationRepository>(TYPES.OrganizationRepository)
  .to(MySQLOrganizationRepository);
wpoContainer
  .bind<IProductRepository>(TYPES.ProductRepository)
  .to(MySQLProductRepository);
wpoContainer
  .bind<IPhaseRepository>(TYPES.PhaseRepository)
  .to(MYSQLPhaseRepository);
wpoContainer
  .bind<IKnowledgeAreaRepository>(TYPES.KnowledgeAreaRepository)
  .to(MySQLKnowledgeAreaRepository);

export { wpoContainer };

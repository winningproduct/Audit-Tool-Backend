import { ILogger } from '../shared/abstract/util/logger';
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { path } from './routes';
import { wpoContainer, TYPES } from '../../inversify.config';
import { handleError } from '../shared/util/errorHandler';
import { ok } from '../shared/util/responseHandler';
const logger = wpoContainer.get<ILogger>(TYPES.Logger);

// Knowledge Areas
export const enrtyPoint: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  _context,
) => {
  try {
    const result = await path.run(event, _context);
    return ok(result);
  } catch (err) {
    logger.log(err.name, err);
    return handleError(err);
  }
};

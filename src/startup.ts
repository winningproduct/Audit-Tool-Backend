import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { path } from './routes';
import { handleError } from '@util/errorHandler';
import { ok } from '@util/responseHandler';

export const enrtyPoint: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  _context,
) => {
  try {
    const result = await path.run(event, _context);
    return ok(result);
  } catch (err) {
    return handleError(err);
  }
};

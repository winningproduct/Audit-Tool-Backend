import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { path } from './routes';
// import { Routes } from './routes';
import { handleError } from '@util/errorHandler';
import { ok } from '@util/responseHandler';
import { Inversify } from '@root/inversify.config';

export const enrtyPoint: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  _context,
) => {
  try {
    Inversify.initializeContainer();
    // const path = new Routes().path;
    const result = await path.run(event, _context);
    // Inversify.destroyContainer();
    return ok(result);
  } catch (err) {
    console.log(err);
    return handleError(err);
  }
};

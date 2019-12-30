import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { handleRoutes, routeRegistrations } from './routes';

// PRODUCTS
export const product: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  _context,
) => {
  const { match } = handleRoutes(event, routeRegistrations);
  const action = match && match.getAction();
  const result =  action && await action(event) || {};
  return result as APIGatewayProxyResult;
};

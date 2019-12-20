import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import 'source-map-support/register';
import {ok} from './src/shared/util/responseHandler';

// export const myMiddleware: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context) => {
//   if (context.prev === undefined) {
//     // Previous middleware handler didn't return. End execution.
//     console.log(context);
//     return {
//       statusCode: 200,
//       body: 'No results',
//     };
//   }
// };

export const hello: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  _context,
) => {
  throw new Error('Error Thrown');
  return ok('hi');
};

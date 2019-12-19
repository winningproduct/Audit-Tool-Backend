import { APIGatewayProxyResult } from 'aws-lambda';

export function ok(obj: any): APIGatewayProxyResult {
    return {
      statusCode: 200,
      body: JSON.stringify(obj),
    };
  }

export function created(obj: any): APIGatewayProxyResult {
    return {
      statusCode: 201,
      body: JSON.stringify(obj),
    };
  }

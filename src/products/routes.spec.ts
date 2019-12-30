import { handleRoutes } from './routes';
import { APIGatewayProxyEvent } from 'aws-lambda';

describe('Route Handler', () => {
  const routeRegistrations = [
    {
      signature: '/a',
      getAction: () => {
        return '/a';
      },
    },
    {
      signature: '/a/{id}',
      getAction: () => {
        return '/a/{id}';
      },
    },
    {
      signature: '/a/{id}/b',
      getAction: () => {
        return '/a/{id}/b';
      },
    },
    {
      signature: '/a/{id}/b/{id2}/c',
      getAction: () => {
        return '/a/{id}/b/{id2}/c';
      },
    },
    {
      signature: '/a/{id}/b/{id2}/c/d/f',
      getAction: () => {
        return '/a/{id}/b/{id2}/c/d/f';
      },
    },
  ];

  test('handles simple routes', () => {
    const result = handleRoutes({ path: '/a' } as APIGatewayProxyEvent, routeRegistrations);
    const route = result.match.signature;
    expect(route).toEqual('/a');
  });

  test('handles simple routes', () => {
    const result = handleRoutes({ path: '/a/34345' } as APIGatewayProxyEvent, routeRegistrations);
    const route = result.match.signature;
    expect(route).toEqual('/a/{id}');
  });

  test('handles simple routes', () => {
    const result = handleRoutes({ path: '/a/34345/b' } as APIGatewayProxyEvent, routeRegistrations);
    const route = result.match.signature;
    expect(route).toEqual('/a/{id}/b');
  });

  test('handles simple routes', () => {
    const result = handleRoutes({ path: '/a/34345/b/3123/c' } as APIGatewayProxyEvent, routeRegistrations);
    const route = result.match.signature;
    expect(route).toEqual('/a/{id}/b/{id2}/c');
  });

  test('handles simple routes', () => {
    const result = handleRoutes({ path: '/a/helloquery/b?q=1&q2=123' } as APIGatewayProxyEvent, routeRegistrations);
    const route = result.match.signature;
    expect(route).toEqual('/a/{id}/b');
  });

  test('handles simple routes', () => {
    expect(1).toEqual(2);
  });

});

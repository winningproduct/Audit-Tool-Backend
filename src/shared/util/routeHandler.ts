import { APIGatewayProxyEvent } from 'aws-lambda';

export function handleRoutes(event: APIGatewayProxyEvent, registrations: any) {
  const path = event.path.split('?')[0];
  const pathSplit = path.split('/');

  const isParameter = (p: any) => {
    const result = p[0] === '{' && p[p.length - 1] === '}';
    return result;
  };
  let matchRoute = null;
  // searching for the matching path
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < registrations.length; i++) {
    let isRouteMatch = true;
    const registration = registrations[i];
    const regSplit = registration.signature.split('/');
    if (regSplit.length === pathSplit.length) {
      // tslint:disable-next-line: prefer-for-of
      for (let j = 0; j < regSplit.length; j++) {
        if (!isParameter(regSplit[j])) {
          if (pathSplit[j] !== regSplit[j]) {
            isRouteMatch = false;
          }
        }
      }
    } else {
      isRouteMatch = false;
    }
    if (isRouteMatch) {
      matchRoute = registration;
      break;
    }
  }
  return {
    match: matchRoute,
  };
}

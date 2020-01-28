import * as https from 'https';
import { CognitoUserPoolTriggerEvent } from 'aws-lambda';

export const authToken = async (
  event: CognitoUserPoolTriggerEvent,
  _context: any,
  callback: any,
) => {
  const URL =
    'https://53ph0bulw2.execute-api.ap-south-1.amazonaws.com/dev/user/email/' +
    event.request.userAttributes.email;
  await new Promise((resolve, reject) => {
    https
      .get(URL, res => {
        let buffer = '';
        res.on('data', chunk => (buffer += chunk));
        res.on('end', () => {
          const result = JSON.parse(buffer);
          if (result.length <= 0) {
            const error = new Error('User Not Found');
            callback(error, event);
          }
          event = {
            ...event,
            response: {
              claimsOverrideDetails: {
                claimsToAddOrOverride: {
                  organization: result[0].organizationId,
                  userId: result[0].id,
                },
              },
            },
          };
          callback(null, event);
          resolve(JSON.parse(buffer));
        });
      })
      .on('error', e => {
        callback(e);
        reject(e);
      });
  });
  callback(null, event);
};

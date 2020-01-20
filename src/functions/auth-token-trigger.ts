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
          event = {
            ...event,
            response: {
              claimsOverrideDetails: {
                claimsToAddOrOverride: {
                  organization: result.length > 0 ? result[0].id : '1',
                  userId: result.length > 0 ? result[0].userId : '1',
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

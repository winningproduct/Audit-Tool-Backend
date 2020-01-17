import * as https from 'https';
import { CognitoUserPoolTriggerEvent } from 'aws-lambda';

const URL =
  'https://53ph0bulw2.execute-api.ap-south-1.amazonaws.com/dev/products/1';

export const authToken = async (
  event: CognitoUserPoolTriggerEvent,
  _context: any,
  callback: any,
) => {
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
                  organization: result[0].organizationId,
                  userId: result[0].userId,
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

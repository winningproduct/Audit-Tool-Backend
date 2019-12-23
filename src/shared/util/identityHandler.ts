import { Identity } from '../models/identity';

export function resolveIdentity(_event: any): Identity {
    return { userId: 1, organizationId: 1 } as Identity;
  }

import { DOMAIN, PROTOCOL } from './constants';

export function getBaseUrl(environment: unknown): string {
  switch (environment) {
    case 'STAGE':
      return `${PROTOCOL}://${DOMAIN}`;
    default:
      throw new Error('Environment not available or not configured');
  }
}

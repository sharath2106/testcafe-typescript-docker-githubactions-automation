import {DOMAIN, PROTOCOL} from "./constants";

export function getBaseUrl(environment: unknown) {
    switch (environment) {
        case 'STAGE':
            return `${PROTOCOL}://${DOMAIN}`;
        default:
            throw new Error('Environment not available or not configured');
    }
}
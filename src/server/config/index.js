
/* import {
  graphQLPath,
  graphiQLPath
} from '../client/consts';
 */
export const graphQLPath = '/graphql';
export const graphiQLPath = '/graphiql';

export const isDev = process.env.NODE_ENV !== 'production';

export const nextAppDir = process.env.NODE_ENV === 'production' ? './build/app/client' : './src/client';

// export const docRootDir = '';

export const HN_DB_URI = process.env.DB_URI || 'https://hacker-news.firebaseio.com';
export const HN_API_VERSION = process.env.HN_API_VERSION || '/v0';
export const HN_API_URL = process.env.HN_API_URL || `${HN_DB_URI}${HN_API_VERSION}`;

export const HOST_NAME = process.env.HOST_NAME || 'localhost';
export const APP_PORT = process.env.APP_PORT || 3000;
export const HOST = (process.browser && window.location.host) || `${HOST_NAME}:${APP_PORT}`;

export const APP_URI = `http://${HOST}`;
export const GRAPHQL_URL = `${APP_URI}${graphQLPath}`;
export const GRAPHIQL_URL = `${APP_URI}${graphiQLPath}`;

//
// MongoDB
//
export const MONGODB_URI = process.env.MONGODB_URI;

//
// Auth
//
export const AUTH_DB_URI = process.env.AUTH_DB_URI;
export const AUTH_JWT_SECRET = process.env.AUTH_JWT_SECRET;


/*
  Cryptography
  https://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2_password_salt_iterations_keylen_digest_callback
*/
export const passwordIterations = 10000;

export const initConfig = require('./initConfig');

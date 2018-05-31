const isDev = exports.isDev = process.env.NODE_ENV !== 'production';

const graphQLPath = exports.graphQLPath = '/graphql';
const graphiQLPath = exports.graphiQLPath = isDev ? '/graphiql' : '';


const nextAppDir = exports.nextAppDir = process.env.NODE_ENV === 'production' ? './build/app/client' : './src/client';

// export const docRootDir = '';

const HOST_NAME = exports.HOST_NAME = process.env.HOST_NAME || 'localhost';
const APP_PORT = exports.APP_PORT = process.env.APP_PORT || 3000;
const HOST = exports.HOST = `${HOST_NAME}:${APP_PORT}`;
const APP_URI = exports.APP_URI = `http://${HOST}`;
const GRAPHQL_URL = exports.GRAPHQL_URL = process.env.GRAPHQL_URL || `${APP_URI}${graphQLPath}`;
const GRAPHIQL_URL = exports.GRAPHIQL_URL = graphiQLPath ? `${APP_URI}${graphiQLPath}` : '';
// set HOST to environment variable
// so we can use it from the client config for SSR
if (!process.env.HOST) {
  process.env.HOST = HOST;
}

//
// MongoDB
//
const MONGODB_URI = exports.MONGODB_URI = process.env.MONGODB_URI;

//
// Auth
//
const AUTH_DB_URI = exports.AUTH_DB_URI = process.env.AUTH_DB_URI;
const AUTH_JWT_SECRET = exports.AUTH_JWT_SECRET = process.env.AUTH_JWT_SECRET || "SET_JWT_SECRET";
const AUTH_SESSION_SECRET = exports.AUTH_SESSION_SECRET = process.env.AUTH_SESSION_SECRET || "SET_SESSION_SECRET";

/*
  Cryptography
  https://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2_password_salt_iterations_keylen_digest_callback
*/
exports.passwordIterations = 10000;


const { join } = require('path');

const isDev = exports.isDev = process.env.NODE_ENV !== 'production';

const graphQLPath = exports.graphQLPath = '/graphql';
const graphiQLPath = exports.graphiQLPath = isDev ? '/graphiql' : '';


exports.nextAppDir = process.env.NODE_ENV === 'production' ? './build/app/client' : './src/client';

exports.docRootDir = join(__dirname, '../../public');

const HOST_NAME = exports.HOST_NAME = process.env.HOST_NAME || 'localhost';
const APP_PORT = exports.APP_PORT = process.env.APP_PORT || 3000;
const HOST = exports.HOST = `${HOST_NAME}:${APP_PORT}`;
const APP_URI = exports.APP_URI = `http://${HOST}`;
exports.GRAPHQL_URL = process.env.GRAPHQL_URL || `${APP_URI}${graphQLPath}`;
exports.GRAPHIQL_URL = graphiQLPath ? `${APP_URI}${graphiQLPath}` : '';
// set HOST to environment variable
// so we can use it from the client config for SSR
if (!process.env.HOST) {
  process.env.HOST = HOST;
}

//
// MongoDB
//
exports.MONGODB_URI = process.env.MONGODB_URI;
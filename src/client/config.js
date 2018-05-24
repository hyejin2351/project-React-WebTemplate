export const isDev = process.env.NODE_ENV !== 'production';
export const isBrowser = !!process.browser;

export const graphQLPath = '/graphql';
export const graphiQLPath = isDev ? '/graphiql' : '';
export const HOST = isBrowser ? 'localhost:23000' : 'localhost:3000';
export const APP_URI = `http://${HOST}`;
export const GRAPHQL_URL = `${APP_URI}${graphQLPath}`;
export const GRAPHIQL_URL = `${APP_URI}${graphiQLPath}`;

export const isDev = process.env.NODE_ENV !== 'production';
export const isBrowser = !!process.browser;

export const graphQLPath = '/graphql';
export const graphiQLPath = isDev ? '/graphiql' : '';

const hostOnBrowser = isBrowser && window.location.host;
const hostOnServer = !isBrowser && process.env.HOST;
export const HOST = isBrowser ? hostOnBrowser : hostOnServer;
export const APP_URI = `http://${HOST}`;
export const GRAPHQL_URL = `${APP_URI}${graphQLPath}`;
export const GRAPHIQL_URL = graphiQLPath && `${APP_URI}${graphiQLPath}`;

export const ADMIN_IP = '127.0.0.1';
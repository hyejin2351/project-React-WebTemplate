import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import fetch from 'isomorphic-fetch';
import debug from 'debug';

import {
  GRAPHQL_URL,
  isBrowser
} from '../config';

const logger = debug('app:initApollo');
logger.log = console.log.bind(console);

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  global.fetch = fetch;
}

function create(initialState, { getToken }) {

/**
 * 
    link: ApolloLink;
    cache: ApolloCache<TCacheShape>;
    ssrMode?: boolean;
    ssrForceFetchDelay?: number;
    connectToDevTools?: boolean;
    queryDeduplication?: boolean;
    defaultOptions?: DefaultOptions;
 */

  return new ApolloClient({
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: createHttpLink({
      uri: GRAPHQL_URL,
      credentials: 'same-origin',
      headers: {
        // HTTP Header:  Cookie: <cookiename>=<cookievalue>
        Cookie: `connect.sid=${getToken()['connect.sid']}`,
      },
    }),
    cache: new InMemoryCache().restore(initialState || {}),
    connectToDevTools: isBrowser,
  });
}

export default function initApollo(initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}

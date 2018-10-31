import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-unfetch';
import { createUploadLink } from 'apollo-upload-client'

import {
  GRAPHQL_URL,
  isBrowser
} from '../config';

const log = require('debug')('app:initApollo');

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  global.fetch = fetch;
}

function create(initialState, { getToken }) {
  const uploadLink = createUploadLink({
    uri: GRAPHQL_URL,
    credentials: 'same-origin'
  });

  const httpLink = createHttpLink({
    uri: GRAPHQL_URL,
    credentials: 'same-origin'
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    log('TOKEN: ', token);
    return {
      headers: {
        ...headers,
        // HTTP Header:  Cookie: <cookiename>=<cookievalue>
        // The setting below make it work on SSR 
        Cookie: `connect.sid=${token['connect.sid']}; token=${token.token}`,
        // authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(uploadLink),
    cache: new InMemoryCache().restore(initialState || {})
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

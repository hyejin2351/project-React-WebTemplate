import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
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

// See https://www.apollographql.com/docs/react/recipes/authentication.html#Cookie
/* function createLinkUsingCookie(uri, getToken) {
  return createHttpLink({
    uri,
    credentials: 'same-origin',
    headers: {
      // HTTP Header:  Cookie: <cookiename>=<cookievalue>
      Cookie: `connect.sid=${getToken()['connect.sid']}`,
    },
  });
}
 */

// See https://www.apollographql.com/docs/react/recipes/authentication.html#Header
function createLinkUsingAuthHeader(uri, getToken) {
  const httpLink = createHttpLink({
    uri,
    credentials: 'same-origin', // if your backend server is the same domain
    // credentials: 'include',  // if your backend is a different domain.
    headers: {
      // HTTP Header:  Cookie: <cookiename>=<cookievalue>
      Cookie: `connect.sid=${getToken()['connect.sid']}`,
    },
  });
  
/*   const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = getToken();
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      }
    };
  });

  return authLink.concat(httpLink);
 */
  return httpLink;
}

function create(initialState, { getToken }) {
  // const link = createLinkUsingAuthHeader(GRAPHQL_URL, getToken);
  const link = createLinkUsingAuthHeader(GRAPHQL_URL, getToken);
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
    link,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
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

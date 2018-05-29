import React from 'react';
import PropTypes from 'prop-types';
import cookie from 'cookie';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import Head from 'next/head';
import debug from 'debug';

import initApollo from './initApollo';
import { isBrowser } from '../config';

const d = debug('app:withData');

function parseCookies(req, options = {}) {
  const parsedCookie = cookie.parse(
    req ? (req.headers.cookie || '') : document.cookie,
    options
  );
  d('parsed Cookie: ', parsedCookie);
  
  return parsedCookie;
}

function parseAuthHeader(req, options = {}) {
  const auth = req ? req.headers && req.header.authorization.split[1] : localStorage.getItem('token');
  d('parsed Authorization: ', auth);
  return auth;
}

export default ComposedComponent => class WithData extends React.Component {
    static displayName = `WithData(${ComposedComponent.displayName})`;

    static propTypes = {
      apolloState: PropTypes.shape({
        apollo: PropTypes.shape({
          data: PropTypes.object.isRequired
        }).isRequired
      }).isRequired
    }

    static async getInitialProps(context) {
      const { Component, router, req, res } = context;
      let apolloState = { apollo: { data: {} } };

      const apolloClient = initApollo(
        {}, // initial state
        { // options
          getToken: () => parseCookies(req).token
        });

      let appProps = {};
      if (ComposedComponent.getInitialProps) {
        appProps = await ComposedComponent.getInitialProps(context);
      }

      if (res && res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {};
      }

      // Run all graphql queries in the component tree
      // and extract the resulting data
      try {
        // Run all GraphQL queries
        await getDataFromTree(
          <ApolloProvider client={apolloClient}>
            <ComposedComponent
              {...appProps}
              Component={Component}
              router={router}
              apolloState={apolloState}
              apolloClient={apolloClient}
            />
          </ApolloProvider>
        );
      } catch (error) {
        // Prevent Apollo Client GraphQL errors from crashing SSR.
        // Handle them in components via the data.error prop:
        // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
        console.error('Error while running `getDataFromTree`', error);
      }

      if (!process.browser) {
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo's store
      apolloState = {
        apollo: {
          data: apolloClient.cache.extract(),
        } };

      return {
        ...appProps,
        apolloState
      };
    }

    constructor(props) {
      super(props);
      // `getDataFromTree` renders the component first, the client is passed off as a property.
      // After that rendering is done using Next's normal rendering pipeline
      this.apolloClient =
        props.apolloClient ||
        initApollo(props.apolloState.apollo.data, {
          getToken: () => parseCookies().token
        });
    }

    render() {
      return (
        <ApolloProvider client={this.apolloClient}>
          <ComposedComponent {...this.props} apolloClient={this.apolloClient} />
        </ApolloProvider>
      );
    }
};

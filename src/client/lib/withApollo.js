import React from 'react';
import cookie from 'cookie';
import PropTypes from 'prop-types';
import { getDataFromTree } from 'react-apollo';
import Head from 'next/head';
import debug from 'debug';

import initApollo from './initApollo';

const log = debug('app:withApollo');

function parseCookies(req, options = {}) {
  const parsedCookie = cookie.parse(
    req ? (req.headers.cookie || '') : document.cookie,
    options
  );
  log('parsed cookie: ', parsedCookie);
  return parsedCookie;
}

export default (App) => {
  class WithData extends React.Component {
    static async getInitialProps(context) {
      const { Component, router, ctx: { req, res } } = context;
      const apolloState = {};
      const apollo = initApollo({}, {
        getToken: () => parseCookies(req), //[tokenName]
      });

      context.ctx.apolloClient = apollo;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(context);
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
        await getDataFromTree(<App
          {...appProps}
          Component={Component}
          router={router}
          apolloState={apolloState}
          apolloClient={apollo}
        />);
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
      apolloState.data = apollo.cache.extract();

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
        initApollo(props.apolloState.data, {
          getToken: () => parseCookies(), // [tokenName]
        });
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  }

  WithData.displayName = `WithData(${App.displayName})`;

  WithData.propTypes = {
    apolloState: PropTypes.shape({
      data: PropTypes.object.isRequired
    }).isRequired
  };

  return WithData;
};

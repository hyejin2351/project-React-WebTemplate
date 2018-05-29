import React from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import cookie from 'cookie';
import PropTypes from 'prop-types';
import debug from 'debug';

import { isBrowser } from '../config';
import initApollo from './initApollo';

const logger = debug('app:withData');

function parseCookies(ctx = {}, options = {}) {
  const cookieStr = ctx.req ? ctx.req.headers.cookie
    : (typeof document === 'object') && document.cookie;
  logger('cookie str: ', cookieStr);  
  return cookieStr ? cookie.parse(cookieStr) : {};
}

export default ComposedComponent => class WithData extends React.Component {
    static displayName = `WithData(${ComposedComponent.displayName})`

    static async getInitialProps(context) {
      const serverState = { apollo: {} };

      // Setup a server-side one-time-use apollo client for initial props and
      // rendering (on server)

      // logger('getInitialProps with context: ', context);
      const apolloClient = initApollo({}, {
        getToken: () => parseCookies(context), // ['connect.sid'], // .token,
      });

      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(context, apolloClient);
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      if (!isBrowser) {
        if (context.res && context.res.finished) {
          // When redirecting, the response is finished.
          // No point in continuing to render
          return;
        }

        // Provide the `url` prop data in case a GraphQL query uses it
        const url = { query: context.query, pathname: context.pathname };

        // Run all GraphQL queries
        const app = (
          <ApolloProvider client={apolloClient}>
            <ComposedComponent url={url} {...composedInitialProps} />
          </ApolloProvider>
        );
        await getDataFromTree(app);

        // Make sure to only include Apollo's data state
        // Extract query data from the Apollo's store
        serverState.apollo.data = apolloClient.cache.extract();
      }

      // return props for this component
      return {
        serverState,
        ...composedInitialProps,
      };
    }

    static propTypes = {
      serverState: PropTypes.shape({
      }).isRequired,
    }

    static defaultProps = {
      serverState: {},
    }
    
    constructor(props) {
      super(props);
      // Note: Apollo should never be used on the server side beyond the initial
      // render within `getInitialProps()` above (since the entire prop tree
      // will be initialized there), meaning the below will only ever be
      // executed on the client.
      const initialState = this.props.serverState.apollo ? this.props.serverState.apollo.data : {};
      this.apolloClient = initApollo(initialState, {
        getToken: () => parseCookies(), // ['connect.sid'],
      });
    }

    render() {
      return (
        <ApolloProvider client={this.apolloClient}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      );
    }
};

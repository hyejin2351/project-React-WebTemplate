import React from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import cookie from 'cookie';
import PropTypes from 'prop-types';
import debug from 'debug';

import { isBrowser } from '../config';
import initApollo from './initApollo';

const logger = debug('app:withData');

function parseCookies(ctx = {}, options = {}) {
  let mycookie = '';

  if ( ctx.req && ctx.req.headers ) {
    logger('>>>>>>>>>>>>', ctx.req.headers.authorization);
    logger('>>>>>>>>>>>>', ctx.req.headers.Authorization);
    if ( ctx.req.headers.authorization || ctx.req.headers.Authorization ) {
      const data = ctx.req.headers.authorization || ctx.req.headers.Authorization;
      mycookie = data.split(' ')[1];
    } 
    else if ( ctx.req.headers.cookie ) {
      const data = ctx.req.headers.cookie; // document.cookie
      mycookie = cookie.parse(data, options);
    }
  }
  logger('>>>>>>>>>>>>>>>>>>>>>>>>>Parsing cookie: ', mycookie);
  return mycookie;
}

export default ComposedComponent => class WithData extends React.Component {
    static displayName = `WithData(${ComposedComponent.displayName})`
    static propTypes = {
      serverState: PropTypes.object.isRequired,
    }

    static async getInitialProps(context) {
      let serverState = { apollo: {} };

      // Setup a server-side one-time-use apollo client for initial props and
      // rendering (on server)

      // logger('getInitialProps with context: ', context);
      const apollo = initApollo({}, {
        getToken: () => parseCookies(context), // ['connect.sid'], // .token,
      });

      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(context, apollo);
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
          <ApolloProvider client={apollo}>
            <ComposedComponent url={url} {...composedInitialProps} />
          </ApolloProvider>
        );

        await getDataFromTree(app);

        serverState = {
          apollo: { // Make sure to only include Apollo's data state
            data: apollo.cache.extract(), // Extract query data from the Apollo's store
          },
        };
      }

      return {
        serverState,
        ...composedInitialProps,
      };
    }

    constructor(props) {
      super(props);
      // Note: Apollo should never be used on the server side beyond the initial
      // render within `getInitialProps()` above (since the entire prop tree
      // will be initialized there), meaning the below will only ever be
      // executed on the client.
      this.apollo = initApollo(this.props.serverState.apollo.data, {
        getToken: () => parseCookies(), // ['connect.sid'],
      });
    }

    render() {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      );
    }
};

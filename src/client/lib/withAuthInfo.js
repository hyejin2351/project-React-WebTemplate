import React from 'react';
import debug from 'debug';

import checkLoggedIn from './checkLoggedIn';

const log = debug('app:withAuthInfo');

export default Component => class WithAuth extends React.Component {
  static async getInitialProps(context, apolloClient) {
    const { query } = context;
    const { me } = await checkLoggedIn(context);
    let compProps = {};
    if (Component.getInitialProps) {
      compProps = await Component.getInitialProps(context);
    }
    return { me, query };
  }

  render() {
    return (
        <Component {...this.props} me={this.props.me} />
    );
  }
};

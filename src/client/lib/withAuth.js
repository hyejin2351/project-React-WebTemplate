import React from 'react';
import cookie from 'cookie';
import { ApolloConsumer } from 'react-apollo';
import debug from 'debug';

import redirect from './redirect';
import checkLoggedIn from './checkLoggedIn';

const d = debug('app:withAuth');

export default Component => class WithAuth extends React.Component {
  static async getInitialProps(context, apolloClient) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);
    let compProps = {};
    if (Component.getInitialProps) {
      compProps = await Component.getInitialProps(context);
    }
    return { loggedInUser };
  }

  componentDidMount() {
    const { loggedInUser } = this.props;
    if (!loggedInUser || !loggedInUser.user) {
      // If not signed in, send them somewhere more useful
      redirect(null, '/users/signin');
    }    
  }

  render() {
    return (
      <Component {...this.props} me={this.props.loggedInUser.user} />
    );
  }
};

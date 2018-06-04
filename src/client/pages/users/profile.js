import React from 'react';
import cookie from 'cookie';
import { ApolloConsumer } from 'react-apollo';
import Link from 'next/link';
import debug from 'debug';

import redirect from '../../lib/redirect';
import withAuth from '../../lib/withAuth';
import AuthService from '../../lib/AuthService';
import ProfileView from './profile_.jsx';

const log = debug('app:index');

class ProfilePage extends React.Component {
  signout(apolloClient) { 
    return async () => {
      await AuthService.logout({
        uri: '/api/auth/logout',
        apolloClient
      });
      
      /*document.cookie = cookie.serialize('token', '', {
        maxAge: -1 // Expire the cookie immediately
      });*/

      // Redirect to a more useful page when signed out
      redirect(null, '/');
    };
  }

  unregister(apolloClient) {
    return async () => {
      await AuthService.unregister({
        uri: '/api/auth/unregister',
        apolloClient
      });
      // Redirect
      redirect(null, '/');
    };
  }

  render() {
    if (!this.props.me) return (<div>Loading...</div>);

    return (
      <ApolloConsumer>
        {client => (
          <ProfileView 
            me={this.props.me}
            logout={this.signout(client)}
            unregister={this.unregister(client)}
          />
        )}
      </ApolloConsumer>
    );
  }
}

export default withAuth(ProfilePage);

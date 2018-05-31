import React from 'react';
import cookie from 'cookie';
import { ApolloConsumer } from 'react-apollo';
import Link from 'next/link';
import debug from 'debug';

import redirect from '../../lib/redirect';
import withAuth from '../../lib/withAuth';

const log = debug('app:index');

class Profile extends React.Component {
  signout(apolloClient) { 
    return () => {
      document.cookie = cookie.serialize('token', '', {
        maxAge: -1 // Expire the cookie immediately
      });

      // Force a reload of all the current queries now that the user is
      // logged in, so we don't accidentally leave any state around.
      apolloClient.cache.reset().then(() => {
        // Redirect to a more useful page when signed out
        redirect({}, '/');
      });
    };
  }

  render() {
    if (!this.props.me) return (<div>Loading...</div>);

    return (
      <div>
        <br />            
        <p>Hello {this.props.me.id}!</p>
        <br />
        <br />
        <Link href="/"><a>Go to Main</a></Link>
        <br />
        <br />
        <button onClick={this.signout()}>Sign out</button>
      </div>
    );
  }
}

export default withAuth(Profile);

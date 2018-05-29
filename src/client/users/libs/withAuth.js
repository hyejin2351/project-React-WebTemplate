import React, { Component } from 'react';
import Router from 'next/router';
import checkLoggedIn from './checkLoggedIn';
import redirect from '../../helpers/redirect';

export default function withAuth(AuthComponent) {
  return class Authenticated extends Component {
    static async getInitialProps(context) {
      const { loggedInUser } = await checkLoggedIn(context.apolloClient);
      if (!loggedInUser || !loggedInUser.user) {
        redirect(context, '/');
      }
      return { loggedInUser };
    }
      
    constructor(props) {
      super(props);
      this.state = {
        isLoading: false
      };
    }

    render() {
      return (
        <div>
          {this.state.isLoading ? (
            <div>LOADING....</div>
          ) : (
            <AuthComponent {...this.props} auth={AuthService} />
          )}
        </div>
      );
    }
  };
}

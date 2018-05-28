import React, { Component } from 'react';
import Router from 'next/router';
import AuthService from './AuthService';

export default function withAuth(AuthComponent) {
  return class Authenticated extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true
      };
    }

    componentDidMount() {
      if (!AuthService.loggedIn()) {
        Router.push('/');
      }
      // TODO
      this.setState({ isLoading: false });
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

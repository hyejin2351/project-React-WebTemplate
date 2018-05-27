import React from 'react';
import Router from 'next/router';

import AuthService from '../../users/libs/AuthService';

class Logout extends React.Component {
  componentDidMount() {
    AuthService.logout();
    Router.push('/');
  }
    render = () => (
      <div>
        <p>Redirecting...</p>  
      </div>
    );
}

export default Logout;

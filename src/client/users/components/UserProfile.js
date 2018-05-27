import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import AuthService from '../libs/AuthService';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    };
  }

  componentDidMount() {
    if (AuthService.loggedIn()) {
      this.setState({
        isLogin: true
      });
    }
  }

  render() {
    return this.state.isLogin ?
      (
        <div>
          <Link href="/users/profile">
            <a > Profile </a>
          </Link>
          <Link href="/users/logout" >
            <a > Logout </a>
          </Link>
        </div>
      ) : (
        <div>  
          <Link href="/users/login">
            <a > Login </a>
          </Link>
          <Link href="/users/signup">
            <a > Register </a>
          </Link>
        </div>
      );
  }
}

export default UserProfile;

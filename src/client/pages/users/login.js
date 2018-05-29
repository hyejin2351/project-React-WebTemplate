import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import withData from '../../helpers/withData';
import { meQuery } from '../../users/queries/meQuery';
import { isValidNewUser } from '../../users/libs/userValidation';
import LoginErrorCode from '../../users/libs/LoginErrorCode';

import PageView from './login.jsx';

class LoginPageController extends React.Component {
  static propTypes = {
    url: PropTypes.shape({
      query: PropTypes.shape(),
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      login: {
        email: '',
        password: '',
      },
      validationMessage: '',
    };
  }

  componentDidMount() {
    // already logged in.
    if (this.props.me) {
      Router.push('/');
    }
  }

  onLoginIDChange = (e) => {
    this.setState({
      login: {
        email: e.target.value,
        password: this.state.login.password,
      },
    });
  }

  onLoginPasswordChange = (e) => {
    this.setState({
      login: {
        email: this.state.login.email,
        password: e.target.value,
      },
    });
  }

  validateLogin = (e) => {
    if (this.props.me) {
      e.preventDefault();
      Router.push('./login?how=loggedin');
    } else {
      try {
        // isValidNewUser(this.state.register);
      } catch (err) {
        e.preventDefault();
        this.setState({ validationMessage: err.message });
      }
    }
  }

  render() {
    let message = '';
    if (this.props.url && this.props.url.query.how) message = LoginErrorCode.messages[this.props.url.query.how];

    return (
      <PageView
        loginUri={'/api/auth/login'}
        message={message}
        onLoginIDChange={this.onLoginIDChange}
        onLoginPasswordChange={this.onLoginPasswordChange}
        onSubmit={this.validateLogin}
      />
    );
  }
}

const PageWithData = graphql(meQuery, {
  options: {
  },
  props: ({ data: { me } }) => ({
    me,
  }),
})(LoginPageController);

export default withData(props => (
  <PageWithData url={props.url} />
));

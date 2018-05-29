import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import Blank from '../../layouts/Blank';
import withData from '../../helpers/withData';
import meQuery from '../../gql/queries/meQuery';
import {
  isValidNewUser,
} from '../../helpers/validation/User';
import UserLoginErrorCode from '../../helpers/enums/UserLoginErrorCode';

class Page extends React.Component {
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

    // this.validateLogin = this.validateLogin.bind(this);
    // this.onLoginIDChange = this.onLoginIDChange.bind(this);
    // this.onLoginPasswordChange = this.onLoginPasswordChange.bind(this);
  }

  componentDidMount() {
    if (this.props.me) {
      Router.push('/');
    }
  }

  /* Login User */
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
    if (this.props.url && this.props.url.query.how) message = UserLoginErrorCode.messages[this.props.url.query.how];

    return (
      <Blank>
        {message && <p>{message}</p>}
        {this.state.validationMessage && <p>{this.state.validationMessage}</p>}
        <b>Login...</b>
        <br />
        <br />
        <form method="post" action="/api/auth/login" onSubmit={e => this.validateLogin(e)} style={{ marginBottom: '1em' }}>
          <input type="hidden" name="goto" value={(this.props.url && this.props.url.query.goto) || '/news'} />
          <table style={{ border: '0px' }} >
            <tbody>
              <tr>
                <td>username:</td>
                <td>
                  <input type="text" name="email" onChange={this.onLoginIDChange} size="20" autoCorrect="off" spellCheck="false" autoCapitalize="off" autoFocus="true" />
                </td>
              </tr>
              <tr>
                <td>password:</td>
                <td>
                  <input type="password" name="password" onChange={this.onLoginPasswordChange} size="20" />
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <input type="submit" value="login" />
        </form>
        <Link prefetch href="./forgot">
          <a>Forgot your password?</a>
        </Link>
      </Blank>
    );
  }
}

const LoginPage = graphql(meQuery, {
  options: {
  },
  props: ({ data: { me } }) => ({
    me,
  }),
})(Page);

export default withData(props => (
  <LoginPage url={props.url} />
));

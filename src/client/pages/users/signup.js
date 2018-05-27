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
    me: PropTypes.shape({
      id: PropTypes.string,
    }),
  }
  static defaultProps = {
    me: null,
  }
  constructor(props) {
    super(props);
    this.state = {
      register: {
        id: '',
        password: '',
      },
      validationMessage: '',
    };
  }

  /* Register New User */
  onRegisterIDChange = (e) => {
    this.setState({
      register: {
        id: e.target.value,
        password: this.state.register.password,
      },
    });
  }
  onRegisterPasswordChange = (e) => {
    this.setState({
      register: {
        id: this.state.register.id,
        password: e.target.value,
      },
    });
  }

  validateRegister = (e) => {
    if (this.props.me) {
      e.preventDefault();
      Router.push('./login?how=loggedin');
    } else {
      try {
        isValidNewUser(this.state.register);
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
        <b>Create Account</b>
        <br />
        <br />
        <form method="post" action="/auth/register" onSubmit={e => this.validateRegister(e)} style={{ marginBottom: '1em' }}>
          <table style={{ border: '0px' }} >
            <tbody>
              <tr>
                <td>username:</td>
                <td>
                  <input type="text" name="email" onChange={this.onRegisterIDChange} size="20" autoCorrect="off" spellCheck="false" autoCapitalize="off" />
                </td>
              </tr>
              <tr>
                <td>password:</td>
                <td>
                  <input type="password" name="password" onChange={this.onRegisterPasswordChange} size="20" />
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <input type="submit" value="create account" />
        </form>
        <Link prefetch href="./login">
          <a>Already have an account?</a>
        </Link>
      </Blank>
    );
  }
}

const SignupPage = graphql(meQuery, {
  options: {
  },
  props: ({ data: { me } }) => ({
    me,
  }),
})(Page);

export default withData(props => (
  <SignupPage url={props.url} />
));

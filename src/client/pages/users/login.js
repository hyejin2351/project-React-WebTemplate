import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import Blank from '../../layouts/Blank';
import withRoot from '../../helpers/withRoot';

import AuthService from '../../users/libs/AuthService';

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

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (AuthService.loggedIn()) {
      Router.push('/');
      // this.props.url.replaceTo('/')   // redirect if you're already logged in
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

  handleSubmit = (e) => {
    e.preventDefault();

    AuthService.login(this.state.login.email, this.state.login.password)
      .then((res) => {
        // console.log(res);
        Router.push('/');
        // this.props.url.replaceTo('/');
      })
      .catch((err) => {
        this.setState({ validationMessage: err.message });
        console.log(err);
      }); // you would show/hide error messages with component state here 
    
    // if (this.props.me) {
    //   Router.push('./login?how=loggedin');
    // } else {
    //   try {
    //     isValidNewUser(this.state.login);

    //   } catch (err) {
    //     e.preventDefault();
    //     this.setState({ validationMessage: err.message });
    //   }
    // }
  }

  render() {
    let message = '';
    if (this.props.url && this.props.url.query.how) message = UserLoginErrorCode.messages[this.props.url.query.how];

    return (
      <Blank>
        {message && <p>{message}</p>}
        {this.state.validationMessage && <p>{this.state.validationMessage}</p>}
        <b>Login</b>
        <br />
        <br />
        <form onSubmit={e => this.handleSubmit(e)} style={{ marginBottom: '1em' }}>
          <input type="hidden" name="goto" value={(this.props.url && this.props.url.query.goto) || 'news'} />
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

export default withRoot(props => (
  <Page url={props.url} />
));

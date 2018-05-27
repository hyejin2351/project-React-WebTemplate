/*
import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Blank from '../../layouts/Blank';
import LoginForm from '../../components/presentational/LoginForm';
import JSONResponse from '../../helpers/JSONResponse';
import withRoot from '../../helpers/withRoot';
import UserLoginErrorCode from '../../helpers/enums/UserLoginErrorCode';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

class Page extends React.Component {
  static propTypes = {
    url: PropTypes.shape({
      query: PropTypes.shape(),
    }).isRequired,
  }
  static defaultProps = {
  }

  constructor(props) {
    super(props);

    
    // set the initial component state
    this.state = {
      errors: {},
      successMessage: '',
      user: {
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  componentDidMount() {
    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }
  }

  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      const res = new JSONResponse(xhr.status, xhr.response);

      if (res.isSuccess()) {
        // success

        // change the component-container state
        this.setState({
          errors: {}
        });

        // save the token
        Auth.authenticateUser(res.data.token);

        // update authenticated state
        this.props.toggleAuthenticateStatus();

        // redirect signed in user to main page
        this.props.history.push('/');
      } else {
        // failure
        // change the component state
        const errors = res.error;
        errors.summary = res.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }


  render() {
    let message = '';
    if (this.props.url && this.props.url.query.how) message = UserLoginErrorCode.messages[this.props.url.query.how];

    return (
      <Blank>
        <b>Login</b>
        <br />
        <LoginForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          errors={this.state.errors}
          successMessage={this.state.successMessage}
          user={this.state.user}
        />
        <br />
        <Link prefetch href="./forgot">
          <a>Forgot your password?</a>
        </Link>
        <br />
        <br />
        <Link prefetch href="./signup">
          <a>Have no account?</a>
        </Link>
        <br />
        <br />
      </Blank>
    );
  }
}

export default withRoot(withStyles(styles)(props => (
  <Page url={props.url} />
)));
*/

/*
        <form method="post" action="/auth/login" onSubmit={e => this.validateLogin(e)} style={{ marginBottom: '1em' }}>
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

      onLoginIDChange = (e) => {
        this.setState({
          login: {
            id: e.target.value,
            password: this.state.login.password,
          },
        });
      }
      onLoginPasswordChange = (e) => {
        this.setState({
          login: {
            id: this.state.login.id,
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
            isValidNewUser(this.state.login);
          } catch (err) {
            e.preventDefault();
            this.setState({ validationMessage: err.message });
          }
        }
      }
        
*/

import React from 'react';
import PropTypes from 'prop-types';
import { ApolloConsumer } from 'react-apollo';
import debug from 'debug';

import redirect from '../../lib/redirect';
import SignInForm from './signin_.jsx';
import AuthService from '../../lib/AuthService';

const log = debug('app:signin');

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  async processForm(event, apolloClient) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    const email = this.state.user.email;
    const password = this.state.user.password;
    log('processForm: ', email);

    try {
      const res = await AuthService.login({
        uri: '/api/auth/adminlogin',
        apolloClient,
      }, email, password);
      // success
      // change the component-container state
      this.setState({
        errors: {}
      });
      // Force a reload of all the current queries now that the user is
      // logged in, so we don't accidentally leave any state around.
      apolloClient.cache.reset().then(() => {
        // redirect signed-in user to other page
        redirect(null, '/admin');
      });
    } catch (err) {
      // failure
      // change the component state
      this.setState({
        errors: err
      });
    }
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <ApolloConsumer>
        {client => (
          <SignInForm
            onSubmit={e => this.processForm(e, client)}
            onChange={this.changeUser}
            errors={this.state.errors}
          />
        )}
      </ApolloConsumer>
    );
  }
}

export default LoginPage;

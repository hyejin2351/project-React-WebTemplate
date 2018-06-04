import React from 'react';
import Link from 'next/link';
import debug from 'debug';

import redirect from '../../lib/redirect';
import SignUpView from './signup_.jsx';

const log = debug('app:signup');

export default class SignupPage extends React.Component {
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
    this.changeUserData = this.changeUserData.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/auth/register');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      const { status, response } = xhr;
      log('status: ', status);
      log('>>>>>>>>>', response);
      if (status === 200) {
        // success
        // change the component-container state
        this.setState({
          errors: {}
        });
        // redirect
        redirect(null, '/users/signin');
      } else {
        // failure
        // change the component state
        this.setState({
          errors: response
        });
      }
    });
    xhr.send(formData);
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUserData(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  render() {
    return (
      <SignUpView
        onSubmit={this.processForm}
        onChange={this.changeUserData}
        errors={this.state.errors}
      />
    );
  }
}

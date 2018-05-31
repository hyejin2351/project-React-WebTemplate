import React from 'react';
import { Mutation, withApollo } from 'react-apollo';

import gql from 'graphql-tag';
import cookie from 'cookie';

import redirect from '../../lib/redirect';
import checkLoggedIn from '../../lib/checkLoggedIn';

import SignInView from './signin.jsx';

const SIGN_IN = gql`
  mutation Signin($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password}) {
      token
    }
  }
`;

class SignIn extends React.Component {
  static async getInitialProps(context) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);

    if (loggedInUser.user) {
      // Already signed in? No need to continue.
      // Throw them back to the main page
      redirect(context, '/');
    }

    return {};
  }

  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  onSubmit(e, signinUser, data) {
    e.preventDefault();
    e.stopPropagation();

    // request login
    signinUser({
      variables: {
        email: this.email.value,
        password: this.password.value
      }
    });
    this.email.value = this.password.value = '';
  }

  refEmail(node) {
    this.email = node;
  }

  refPassword(node) {
    this.password = node;
  }

  render() {
    const { client } = this.props;
    
    return (
      <Mutation
        mutation={SIGN_IN}

        onCompleted={(data) => {
          // Store the token in cookie
          document.cookie = cookie.serialize('token', data.signinUser.token, {
            maxAge: 30 * 24 * 60 * 60 // 30 days
          });
          // Force a reload of all the current queries now that the user is
          // logged in
          client.cache.reset().then(() => {
            redirect({}, '/users/profile');
          });
        }}

        onError={(error) => {
          console.log(error);
          this.setState({
            errorMessage: error
          });
        }}
      >
        {(signinUser, { data, error }) => (
          <SignInView
            onSubmit={e => this.onSubmit(e, signinUser, data)}
            errorMessage={this.state.errorMessage}
            refEmail={node => this.refEmail(node)}
            refPassword={node => this.refPassword(node)}
          />
        )}
      </Mutation>
    );
  }
}

export default withApollo(SignIn);

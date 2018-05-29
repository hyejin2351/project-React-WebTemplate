import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import Blank from '../../layouts/Blank';

const LoginPage = ({
  loginUri,
  message,
  onLoginIDChange,
  onLoginPasswordChange,
  onSubmit,
}) => (
      <Blank>
        {message && <p>{message}</p>}
        <b>Login</b>
        <br />
        <br />
        <form method="post" action={loginUri} onSubmit={onSubmit} style={{ marginBottom: '1em' }}>
          <input type="hidden" name="goto" value={'/news'} />
          <table style={{ border: '0px' }} >
            <tbody>
              <tr>
                <td>username:</td>
                <td>
                  <input type="text" name="email" onChange={onLoginIDChange} size="20" autoCorrect="off" spellCheck="false" autoCapitalize="off" autoFocus="true" />
                </td>
              </tr>
              <tr>
                <td>password:</td>
                <td>
                  <input type="password" name="password" onChange={onLoginPasswordChange} size="20" />
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <input type="submit" value="login" />
        </form>
        <br />
        <br />
        <Link href="./forgot">
          <a>Forgot your password?</a>
        </Link>
        <br />
        <br />
        <Link prefetch href="./signup">
          <a>Have no account?</a>
        </Link>
      </Blank>
)

export default LoginPage;

import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';
import Router from 'next/router';
import { graphql } from 'react-apollo';

import withData from '../../helpers/withData';
import { meQuery } from '../queries/meQuery';

class UserProfilePageController extends React.PureComponent {
  static propTypes = {
    me: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.any]).isRequired,
  }
  static defaultProps = {
    me: {}
  }

  render() {
    return this.props.me ?
      (
        <div>
          <Link href="/users/profile">
            <a > Profile </a>
          </Link>
          <Link href="/api/auth/logout" >
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

const PageWithData = graphql(meQuery, {
  options: {
  },
  props: ({ data: { me } }) => ({
    me,
  }),
})(UserProfilePageController);

export default withData(props => (
  <PageWithData />
));

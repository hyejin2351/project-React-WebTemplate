import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';

import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';

import renderHTML from 'react-render-html';

import Main from '../../layouts/Main';
import Blank from '../../layouts/Blank';
import withData from '../../helpers/withData';
import timeAgo from '../../helpers/convertNumberToTimeAgo';
import { meQuery } from '../../users/queries/meQuery';
import PageView from './profile.jsx';

const ProfilePageController = ({ 
  loading, error, me, options: { currentURL } 
}) => {
  if (error) return <Blank>Error loading news items.</Blank>;

  let email = me.email || '';
  let about = me.about || '';
  const onEmailChange = (e) => { email = e.target.value; };
  const onAboutChange = (e) => { about = e.target.value; };

  return (
    <PageView
      me={me}
      currentURL={currentURL}
      onEmailChange={onEmailChange}
      onAboutChange={onAboutChange}
    />
  );
};

const PageWithData = graphql(meQuery, {
  options: {
  },
  props: ({ data: { me } }) => ({
    me,
  }),
})(ProfilePageController);

export default withData(props => (
  <PageWithData options={{
    currentURL: props.url.pathname
  }}
  />
));

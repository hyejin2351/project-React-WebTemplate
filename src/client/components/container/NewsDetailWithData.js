import { graphql } from 'react-apollo';
import Router from 'next/router';

import NewsDetail from '../presentational/NewsDetail';
import hideNewsItem from '../../gql/mutations/hideNewsItem';


export default graphql(hideNewsItem, {
  props: ({ ownProps, mutate }) => ({
    hideNewsItem: id =>
      mutate({
        variables: { id },
      })
      // .then(() => Router.push(`/users/login?id=${id}&password=${password}`))
        .catch(() => Router.push('/users/login', `/hide?id=${id}&how=up&goto=news`)),
    unhideNewsItem: id =>
      mutate({
        variables: { id },
      })
        .catch(() => Router.push('/users/login', `/unhide?id=${id}&how=up&goto=news`)),
  }),
})(NewsDetail);

/**
 * Created by jcdev00 on 18. 10. 24.
 */

import gql from 'graphql-tag';

export const ArticlesCountQuery = gql`
  query {
    getArticlesCount
  }
`

export const ArticlesQuery = gql`
  query getArticles($limit: Int!, $skip: Int!) {
    getArticles(limit: $limit, skip: $skip) {
        id
        title
        content
        views
        created
        author {
            id
            name
        }
    }
  }
`
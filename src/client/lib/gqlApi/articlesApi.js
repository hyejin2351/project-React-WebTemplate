/**
 * Created by jcdev00 on 18. 10. 24.
 */

import gql from 'graphql-tag';

export const AllArticlesQuery = gql`
  query AllArticlesQuery($limit: Int!, $skip: Int!) {
    getArticlesCount
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

export const ArticlesCountQuery = gql`
  query {
    getArticlesCount
  }
`

export const ArticleQuery = gql`
  query getArticle($id: String!) {
    getArticle(id: $id) {
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

export const ArticleCreate = gql`
  mutation createArticle($articleData: ArticleData!) {
    createArticle(articleData: $articleData) {
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

export const ArticleUpdate = gql`
  mutation updateArticle($id: String!, $articleData: ArticleData!) {
    updateArticle(id: $id, articleData: $articleData) {
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

export const ArticleDelete = gql`
  mutation deleteArticle($id: String!) {
    deleteArticle(id: $id) {
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
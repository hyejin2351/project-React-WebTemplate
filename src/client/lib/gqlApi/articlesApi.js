/**
 * Created by jcdev00 on 18. 10. 22.
 */

import gql from 'graphql-tag';

class articlesApi {
    static getArticles( {apolloClient} ) {
        return new Promise(function (resolve, reject) {
            apolloClient.query({
                query: gql`
                  query {
                   getArticles {
                     id
                     author {
                       id
                       name
                     }
                   }
                 }
                `
                })
                .then(({ data }) => {
                    resolve({ getArticles: data.getArticles });
                })
                .catch(() =>
                    // Fail gracefully
                    resolve(({ getArticles: {} })))
        });
    }

    static getArticlesCount( {apolloClient} ) {
        return new Promise(function (resolve, reject) {
            apolloClient.query({
                    query: gql`
                  query {
                   getArticlesCount
                 }
                `
                })
                .then(({ data }) => {
                    resolve({ getArticlesCount: data.getArticlesCount });
                })
                .catch(() =>
                    // Fail gracefully
                    resolve(({ getArticlesCount: 0 })))
        });
    }
}

export default articlesApi;
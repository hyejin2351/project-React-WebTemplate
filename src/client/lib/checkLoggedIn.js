import gql from 'graphql-tag';

export default ({ apolloClient }) => (
  apolloClient.query({
    query: gql`
      query Auth {
        me {
          id,
          roles
        }
      }
    `
  })
    .then(({ data }) => ({ me: data.me }))
    .catch(() => 
    // Fail gracefully
      ({ me: {} }))
);

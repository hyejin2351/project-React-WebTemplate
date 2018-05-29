import gql from 'graphql-tag';

export default apolloClient => (
  apolloClient.query({
    query: gql`
      query getUser {
        user {
          id
          email
        }
      }
    `
  }).then(({ data }) => ({ loggedInUser: data })).catch(() => 
    // Fail gracefully
    ({ loggedInUser: {} })
  )
);

import gql from 'graphql-tag';

const meQuery = gql`
  query User {
    me {
      id
      email
    }
  }
`;

export {
  meQuery
}

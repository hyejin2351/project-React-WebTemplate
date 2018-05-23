import gql from 'graphql-tag';

export default gql`
  query HNUser {
    me {
      id
      karma
    }
  }
`;

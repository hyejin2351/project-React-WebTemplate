import gql from 'graphql-tag';

export default gql`
  query HNUser {
    hnme {
      id
      karma
    }
  }
`;

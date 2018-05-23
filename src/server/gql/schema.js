//
// Schema
//
const d = require('debug')('app:gql');
const { makeExecutableSchema } = require('graphql-tools');
const { getUsers } = require('../db/mongoose/resolvers');

//
// See https://www.apollographql.com/docs/apollo-server/example.html
//
const typeDefs = `
  type Query {
    getUsers: [User]
  }

  type User {
      email: String,
      name: String
  }
`;

const resolvers = {
    Query: {
        getUsers: () => getUsers()
    }
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export default schema;

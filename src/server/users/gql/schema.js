//
// Schema
//
const d = require('debug')('app:gql');
const { getUsers } = require('../../db/mongoose/resolvers');

//
// See https://www.apollographql.com/docs/apollo-server/example.html
//
const types = `
  # User type for response
  type User {
    id: String
    email: String
    name: String
  }

  # User type for input, such as creating or updating
  input UserData {
    email: String
    name: String
  }
`;

const queries = `
    getUsers
    : [User]

    getUser(
        id: String!
    ): User

    me
    : User
`;

const mutations = `
    createUser (
      email: String!
      name: String
    ): User

    deleteUser (
      id: String!
    ): User

    updateUser (
      id: String!
      userData: UserData
    ): User
`;

const resolvers = {
  Query: {
    getUsers: (_, __, context) => getUsers(),

    getUser: (_, { id }, context) => {
      const { UserModel } = context;
      return UserModel.findById(id);
    },

    me: (_, __, context) => {
      const { UserModel } = context;
      return context.userId && UserModel.findById(context.userId);
    }
  },

  Mutation: {
    createUser: (_, userData, context) => {
      const { UserModel } = context;
      return UserModel.create(userData);
    },

    deleteUser: (_, { id }, { UserModel }) => UserModel.findByIdAndDelete(id),

    updateUser: (_, { id, userData }, { UserModel }) => UserModel.findByIdAndUpdate(id, userData, { new: true }),
  }
};

module.exports = {
  types,
  queries,
  mutations,
  resolvers,
};

/* const tmpTypes = '';
const tmpQueries = '';
const tmpMutations = '';
const tmpResolvers = {Query:{}, Mutation:{}};

module.exports = {
  types: tmpTypes,
  queries: tmpQueries,
  mutations: tmpMutations,
  resolvers: tmpResolvers,
};
 */
/**
 * Request graphql query
 *

 # getUsers()
query {
  getUsers {
    name,
    email
  }
}

# getUser(id)
query {
  getUser(id:"5b05924bb26ca72855cbf4ce") {
    id,
    name,
    email
  }
}

# createUser(email, name)
mutation {
  createUser(
    email:"c@c.com", 
    name: "c"
  ) {
    id
  }
}

# deleteUser(id)
mutation {
  deleteUser(id:"5b05924bb26ca72855cbf4ce") {
    id
  }
}

# updateUser(id, userData)
mutation {
  updateUser(id:"5b05a5bd181b6c5c06da7a45", userData: {
    name: "CC"
  }) {
    id,
    name
  }
}
*/


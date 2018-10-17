//
// Schema
//
const d = require('debug')('app:gql');
const UserModel = require('../models/user');

//
// See https://www.apollographql.com/docs/apollo-server/example.html
//
const types = `
  # User type for response
  type User {
    id: String
    email: String
    name: String
    nickName: String
    profileImageURL: String
    roles: [String]
    providerType: String
    created: Date
  }

  # User type for input, such as creating or updating
  input UserData {
    email: String
    name: String
    nickName: String
  }
`;

const queries = `
    getUsers(
      # 데이터를 정렬, 필드명 : 오름차순 정렬, -필드명 : 내림차순 정렬
      sort: String
      # 출력할 데이터 갯수를 제한
      limit: Int
      # 시작부분을 설정
      skip: Int
    )
    : [User]

    getUser(
        id: String
    ): User

    me
    : User
`;

const mutations = `
    changePassword(
      curPassword: String!
      newPassword: String!
    ): User
    
    createUser (
      userData: UserData!
      password: String!
    ): User

    deleteUser (
      id: String!
    ): User

    updateUser (
      id: String!
      userData: UserData
    ): User
`;

function isAdminUser(roles) {
  let isAdmin = false;

  if(roles && roles.includes('admin'))
    isAdmin = true;

  return isAdmin;
}

const resolvers = {
  Query: {
    me: (_, __, context) => {
      const { userId } = context;
      return userId && UserModel.findById(userId);
    },
    
    getUser: (_, { id }, { userId, roles }) => {
      if(!userId)
        return new Error('Must be logged');

      if (!isAdminUser(roles)) {
        return new Error('No permission');
      }

      return UserModel.findById(id);
    },

    getUsers: (_, { sort, limit, skip}, { userId, roles }) => {
      if(!userId)
        return new Error('Must be logged');

      if (!isAdminUser(roles)) {
        return new Error('No permission');
      }

      const sortS = sort ? sort : '';
      const limitI = limit ? limit : 0;
      const skipI = skip ? skip : 0;

      return UserModel.find({ roles: { $ne: 'admin'} }).skip(skipI).limit(limitI).sort(sortS);
    },
  },

  Mutation: {
    //user
    changePassword: (_, {curPassword, newPassword}, { userId }) => {
      if(!userId)
        return new Error('Must be logged');

      return UserModel.findByIdChangePassword(userId, curPassword, newPassword)
    },

    //admin
    createUser: (_, { userData, password }, { userId, roles }) => {
      if(!userId)
        return new Error('Must be logged');

      if (!isAdminUser(roles)) {
        return new Error('No permission');
      }

      // admin only
      return UserModel.register(userData, password);
    },

    deleteUser: (_, {id}, { userId, roles }) => {
      if(!userId)
        return new Error('Must be logged');

      if (!isAdminUser(roles)) {
        return new Error('No permission');
      }

      return UserModel.findByIdAndDelete(id);
    },

    updateUser: (_, { id, userData }, { userId, roles }) => {
      if(!userId)
        return new Error('Must be logged');

      if (!isAdminUser(roles)) {
        return new Error('No permission');
      }

      return UserModel.findByIdAndUpdate(id, userData, { new: true });
    }
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
  getUsers (
    sort:"name",
    limit: 0,
		skip: 0
  )
  {
    name,
    email
  }
}

# getUser(id)
query {
  getUser(id:"5bbf17361722083906004a62") {
    id,
    name,
    email
  }
}

# createUser(email, name)
 mutation {
  createUser(userData: {
    email: "test@gmail.com"
	name: "CC"
	nickName: "CC"
  }, password: "qw12QW!@") {
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


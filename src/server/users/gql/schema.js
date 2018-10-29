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
      # 검색어
      search: String
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
    
    getUsersCount
   : Int
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

    getUsers: (_, { limit, skip, search}, { userId, roles }) => {
      if(!userId)
        return new Error('Must be logged');

      if (!isAdminUser(roles)) {
        return new Error('No permission');
      }

      console.log('search = ' + search);
      const limitI = limit ? limit : 0;
      const skipI = skip ? skip : 0;
      const query = search ? { name : search, roles: { $ne: 'admin'}} : { roles: { $ne: 'admin'}}

      return UserModel.find( query ).skip(skipI).limit(limitI).sort({ created: -1});
    },

    getUsersCount: (_, __, context) => {
      return UserModel.find( { roles: { $ne: 'admin'}} ).then( users => {
        return users ? users.length : 0
      }).catch(err => {
        return 0;
      })
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

function isAdminUser(roles) {
  let isAdmin = false;

  if(roles && roles.includes('admin'))
    isAdmin = true;

  return isAdmin;
}

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

 # me
 query Auth {
        me {
          id,
          name,
          email,
          nickName,
          profileImageURL
          roles,
          providerType,
          created
        }
      }
 
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

 # changePassword
 mutation {
  changePassword(curPassword: "qw12QW!@", newPassword: "12qw!@QW") {
    id
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


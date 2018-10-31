//
// Schema
//
const d = require('debug')('app:gql');
const UserModel = require('../models/user');
const {
    DEFAULT_PROFILE,
    UPLOAD_DIR
} = require('../config');

const fs = require('fs');
const shortid = require('shortid');
const mkdirp = require('mkdirp');
mkdirp.sync(UPLOAD_DIR);

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
  
  type File {
    id: ID!
    path: String!
    filename: String!
    mimetype: String!
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
    
    changeProfile (
      nickName: String
      file: Upload
      isDelete: Boolean
    ): User
    
    updateMe (
      userData: UserData
    ): User
    
    singleUpload(file: Upload!): User!
    
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
      const query = search ? { name : { $regex: search+'.*'} , roles: { $ne: 'admin'}} : { roles: { $ne: 'admin'}}

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

    changeProfile: async (obj, { nickName, file, isDelete }, { userId }) => {
      try {
        const { path } = file ? (await processUpload(file)) : {};
        const user = await UserModel.findById(userId);
        const profileImageURL = path ? path.substring('./public'.length) : (isDelete ? DEFAULT_PROFILE : null)

        //이미지 변경이거나 이미지 삭제이면
        if(file || isDelete) {
          // /uploads/으로 시작하면 사용자가 업로드한 이미지이므로
          if(user.profileImageURL.includes('/uploads/')) {
            // file delete
            // 실제 경로는 ./public/uploads/~ 이므로 파일을 삭제 할때는 실제 경로 지정
            await fs.unlinkSync('./public'.concat(user.profileImageURL));
          }
        }

        let update = {}

        if(profileImageURL)
            update['profileImageURL'] = profileImageURL;
        if(nickName)
          update['nickName'] = nickName;

        console.log(update);

        // 접속 url을 /uploads/~ 이므로 db에 저장할때는 ./public/ 제외하고 저장
        return await UserModel.findByIdAndUpdate(userId, { $set: update } , { new: true });
      } catch( err) {
        return err;
      }
    },

    updateMe: (_, { userData }, { userId }) => {
      if(!userId)
        return new Error('Must be logged');

      return UserModel.findByIdAndUpdate(userId, userData, { new: true });
    },

    singleUpload: async (obj, { file }, { userId }) => {
      try {
        const { path } = await processUpload(file);
        const user = await UserModel.findById(userId);

        // /uploads/으로 시작하면 사용자가 업로드한 이미지이므로
        if(user.profileImageURL.includes('/uploads/')) {
          // file delete
          // 실제 경로는 ./public/uploads/~ 이므로 파일을 삭제 할때는 실제 경로 지정
          await fs.unlinkSync('./public'.concat(user.profileImageURL));
        }

        // 접속 url을 /uploads/~ 이므로 db에 저장할때는 ./public/ 제외하고 저장
        return await UserModel.findByIdAndUpdate(userId, { profileImageURL: path.substring('./public'.length) } , { new: true });
      } catch( err) {
        return err;
      }
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


const storeUpload = async ({ stream, filename }) => {
  const id = shortid.generate()
  const path = `${UPLOAD_DIR}/${id}-${filename}`;

  return new Promise((resolve, reject) =>
      stream
          .on('error', error => {
            if (stream.truncated)
            // Delete the truncated file
              fs.unlinkSync(path)
            reject(error)
          })
          .pipe(fs.createWriteStream(path))
          .on('error', error => reject(error))
          .on('finish', () => resolve({ id, path }))
  )
}

const processUpload = async ( upload ) => {
  const { stream, filename, mimetype } = await upload
  return { id, path } = await storeUpload({ stream, filename });
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


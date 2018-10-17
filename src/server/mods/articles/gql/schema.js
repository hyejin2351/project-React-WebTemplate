//
// Schema
//
const d = require('debug')('app:mod-articles');
const ArticleModel = require('../models');

//
// See https://www.apollographql.com/docs/apollo-server/example.html
//
const types = `
  # User type for response
  type Article {
    id: String
    title: String
    content: String
    views: Int
    created: Date
    author: User
  }

  # Article type for input, such as creating or updating
  input ArticleData {
    title: String
    content: String
  }
`;

const queries = `
  getArticles(
    # 데이터를 정렬, 필드명 : 오름차순 정렬, -필드명 : 내림차순 정렬
    sort: String
    # 출력할 데이터 갯수를 제한
    limit: Int
    # 시작부분을 설정
    skip: Int
    # 등록한 사용자 아이디
    author: String
  ): [Article]
  
  getArticle(
    id: String!
  ): Article
`;

const mutations = `
  createArticle (
    articleData: ArticleData!
  ): Article

  deleteArticle (
    id: String!
  ): Article

  updateArticle (
    id: String!
    articleData: ArticleData
  ): Article
`;

const resolvers = {
  Query: {
    getArticles: (_, { sort, limit, skip, author}, { userId, roles }) => {
      const query = author ? { author: author} : {}
      const sortS = sort ? sort : '';
      const limitI = limit ? limit : 0;
      const skipI = skip ? skip : 0;

      return ArticleModel.find( query ).skip(skipI).limit(limitI).sort(sortS).populate('author');
    },

    getArticle: (_, { id }, { userId, roles }) => {
      return ArticleModel.findById(id).then(article=> {
        return ArticleModel.findByIdAndUpdate(id, { views: article.views + 1 }, { new: true }).populate('author');
      }).catch(err => {
        return err;
      });
    },
  },

  Mutation: {
    createArticle: (_, { articleData }, { userId, roles }) => {
      if(!userId)
        return new Error('Must be logged');

      // admin only
      return ArticleModel.create( {...articleData, author: userId } ).then( article => {
        return ArticleModel.findById(article.id).populate('author');
      }).catch(err => {
        return err;
      });
    },

    deleteArticle: (_, {id}, { userId, roles }) => {
      if(!userId)
        return new Error('Must be logged');

      return ArticleModel.findById(id).then(article => {
        if (!isAdminUser(roles) || article.id === userId) {
          return new Error('No permission');
        }

        return ArticleModel.findByIdAndDelete(id).populate('author');
      }).catch(err => {
        return err;
      });

    },

    updateArticle: (_, { id, articleData }, { userId, roles }) => {
      if(!userId)
        return new Error('Must be logged');

      return ArticleModel.findById(id).then(article => {
        if (!isAdminUser(roles) || article.id === userId) {
          return new Error('No permission');
        }

        return ArticleModel.findByIdAndUpdate(id, articleData, { new: true }).populate('author');
      }).catch(err => {
        return err;
      });
    }
  }
};

function isAdminUser(roles) {
  let isAdmin = false;

  if(roles && roles.includes('admin'))
    isAdmin = true;

  return isAdmin;
}

/*
 Request graphql
 1. getArticles

 query {
   getArticles {
     id
     author {
       id
       name
     }
   }
 }

 query {
   getArticles(author:"5bc6eb94eee3a421bf89fb97")
   {
     id
     author {
       id
       name
     }
   }
 }

2. getArticle
 query {
   getArticle(id:"5bc6eed995e64c22f3a4c41e")
   {
     id
     author {
       id
       name
     }
   }
 }

3. createArticle
 mutation {
   createArticle(articleData: {
       title: "tes1t@gmail.com"
       content: "CasdasdadaC"
     }) {
     id
     title
     author {
       id
       name
     }
   }
 }

4. deleteArticle
 mutation {
   deleteArticle(
    id: "5bc6fd0581b34a28aa61a144"
   ) {
     id
     title
     author {
       id
       name
     }
   }
 }

5.
 mutation {
   updateArticle(
     id: "5bc6eed995e64c22f3a4c437"
     articleData: {
       title: "tes1t@gmail.com"
       content: "CasdasdadaC"
     }
   ) {
     id
     title
     author {
       id
       name
     }
     }
 }
 */
module.exports = {
  types,
  queries,
  mutations,
  resolvers,
};


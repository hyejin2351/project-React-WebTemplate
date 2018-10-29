//
// Schema
//
const mongoose = require('mongoose');
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
  
  getArticlesCount
  : Int
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
    getArticles: (_, { limit, skip, author}, { userId, roles }) => {
      const query = author ? { author: author} : {}
      const limitI = limit ? limit : 0;
      const skipI = skip ? skip : 0;
      return ArticleModel.find( query ).skip(skipI).limit(limitI).sort({ created: -1}).populate('author');
    },

    getArticle: (_, { id }, { userId, roles }) => {
      return ArticleModel.findById(id).then(article=> {
        return ArticleModel.findByIdAndUpdate(id, { views: article.views + 1 }, { new: true }).populate('author');
      }).catch(err => {
        return err;
      });
    },

    getArticlesCount: (_, __, context) => {
      return ArticleModel.find( {} ).then( articles => {
        return articles ? articles.length : 0
      }).catch(err => {
        return 0;
      })
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
        if (!isEqualsObjectId(article.author, userId) && !isAdminUser(roles) ) {
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
        if (!isEqualsObjectId(article.author, userId) && !isAdminUser(roles) ) {
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

  console.log('isAdmin = ' + isAdmin);

  return isAdmin;
}

function isEqualsObjectId(id1, id2) {
  return id1.equals(id2);
}

/*
 Request graphql
 # getArticles

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

 # getArticle
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

 # getArticlesCount
 query {
 getArticlesCount
 }

 # createArticle
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

 # deleteArticle
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

 # updateArticle
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


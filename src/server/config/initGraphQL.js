
//
// init GraphQL
//
const d = require('debug')('app:graphql');

const bodyParser = require('body-parser');
const {
  graphqlExpress,
  graphiqlExpress,
} = require('apollo-server-express');

const Schema = require('../gql/schema');
const {
  UserModel,
} = require('../db/mongoose/models');
const {
  isDev,
} = require('./');

//
// data folder
//
const {
  Comment,
  Feed,
  NewsItem,
  User,
} = require('../data/Models');
const {
  seedCache,
} = require('../data/HNDataAPI');
// Seed the in-memory data using the HN api
seedCache(isDev ? /* 1000 * 60 * 1  1 minute */ 0 : 0);

module.exports = (server, { // express app
  graphQLPath, // such as /graphql
  graphiQLPath, // such as /graphiql
} = {}) => {
  server.use(graphQLPath, bodyParser.json(), graphqlExpress(
    (req) => {
      const userId = req.user && req.user.id;
      return {
        schema: Schema,
        rootValue: { req },
        context: {
          UserModel,
          userId,
          Comment,
          Feed,
          NewsItem,
          User,
        },
        debug: isDev,
      };
    },
  ));
  
  // use graphiql feature
  if (graphiQLPath) {
    server.use(graphiQLPath, graphiqlExpress({
      endpointURL: graphQLPath,
    }));
  }
};

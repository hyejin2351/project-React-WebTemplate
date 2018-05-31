
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
  isDev,
  AUTH_JWT_SECRET,
  AUTH_SESSION_SECRET,
} = require('./');

/**
 * A function to format errors before they are returned to the client.
 */
const formatError = (err) => {
  if (err.originalError && err.originalError.error_message) {
    err.message = err.originalError.error_message;
  }
  return err;
};

module.exports = (server, { // express app
  graphQLPath, // such as /graphql
  graphiQLPath, // such as /graphiql
} = {}) => {
  /**
   * GraphQLServer Options
   * See https://www.apollographql.com/docs/apollo-server/setup.html#graphqlOptions
   * 
    - schema: GraphQLSchema;
    - formatError?: Function;
    - rootValue?: any;
    - context?: TContext;
    - logFunction?: LogFunction;
    - formatParams?: Function;
    - validationRules?: Array<(context: ValidationContext) => any>;
    - formatResponse?: Function;
    - fieldResolver?: GraphQLFieldResolver<any, TContext>;
    - debug?: boolean;
    - tracing?: boolean;
    - cacheControl?: boolean | CacheControlExtensionOptions;
   */

  const options = {
    schema: Schema,
    context: {
    },
    debug: isDev,
    tracing: isDev,
    cacheControl: !isDev,
    formatError,
  };

  const fnOptions = (req) => {
    const userId = req.user && (req.user.id && req.user._id);
    options.context.userId = userId;
    options.rootValue = { req };
    return options;
  };

  server.use(
    graphQLPath,
    bodyParser.json(),
    graphqlExpress(fnOptions));

  // use graphiql feature
  if (graphiQLPath) {
    server.use(graphiQLPath, graphiqlExpress({
      endpointURL: graphQLPath,
    }));
  }
};

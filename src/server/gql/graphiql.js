/**
   * WARNING: THIS USES THE REAL SCHEMA AND DATABASE!
   *
   *   Take care not to cause data loss but the app should be secure
   */

// TODO: Can make this graphql server part of the main server using feature flag
// Example GraphiQL server https://github.com/graphql/graphiql/tree/master/example
import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'apollo-server-express';

import Schema from './schema';
import {
  APP_PORT,
  graphQLPath,
  graphiQLPath,
  GRAPHQL_URL,
  GRAPHIQL_URL,
} from '../config';
import {
  UserModel,
} from '../db/mongoose/models';

import initMongoose from '../config/initMongoose';

//
// make connection to mongodb
// then start GraphiQL server
//

initMongoose()
  .then(() => {
    const app = express();

    // Mount GraphQL Server middleware
    app.use(graphQLPath, bodyParser.json(), graphqlExpress(request => ({
      schema: Schema,
      rootValue: { request },
      context: {
        UserModel
      },
      debug: true,
    })));
  
    app.use(graphiQLPath, graphiqlExpress({
      endpointURL: graphQLPath,
    }));
  
    app.listen(APP_PORT, () => {
      console.info(`==> 📈 GraphQL Server on ${GRAPHQL_URL}`);
      console.info(`==> 🌎  Go to ${GRAPHIQL_URL}`);
    });
  });

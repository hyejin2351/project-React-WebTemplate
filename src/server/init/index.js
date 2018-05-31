//
// init configuration
//

//
// load .env
require('dotenv/config');
const config = require('../config');

const initProcess = require('./initProcess');
const initExpress = require('./initExpress');
const initNext = require('./initNext');
const initMongoose = require('./initMongoose');
const initGraphQL = require('./initGraphQL');

const initUsers = require('./initUsers');

module.exports = async (options = {}) => {
  const mergedOptions = {
    ...config,
    ...options
  };

  // init process
  await initProcess(mergedOptions);

  // init express
  const server = await initExpress(mergedOptions);

  // init nextjs
  const nextApp = await initNext(mergedOptions);

  // init db
  const dbConn = await initMongoose(mergedOptions);

  // init auth
  await initUsers(server, dbConn, mergedOptions);

  // init graphql
  await initGraphQL(server, mergedOptions);

  return {
    server,
    nextApp,
    dbConn
  };
};

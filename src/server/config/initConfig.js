//
// init configuration
//

//
// load .env
require('dotenv/config');

const config = require('./');
const initProcess = require('./initProcess');
const initExpress = require('./initExpress');
const initNext = require('./initNext');
const initMongoose = require('./initMongoose');
const initGraphQL = require('./initGraphQL');

module.exports = (options = {}) => new Promise((resolve, reject) => {
  // merge
  const mergedOptions = {
    ...config,
    ...options,
  };

  const ret = {};

  // init process
  initProcess(mergedOptions);

  // init express
  ret.server = initExpress(mergedOptions);

  // init nextjs
  initNext(mergedOptions)
    .then((nextApp) => {
      ret.nextApp = nextApp;
    })
    .then(() => initMongoose(mergedOptions))
    .then((mongoose) => {
      // init graphql
      initGraphQL(ret.server, mergedOptions);

      ret.mongoose = mongoose;
      return resolve(ret);
    });
});

//
// init configuration
//
const config = require('./');
const initProcess = require('./initProcess');
const initExpress = require('./initExpress');
const initNext = require('./initNext');
const initMongoose = require('./initMongoose');

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
      ret.mongoose = mongoose;
      return resolve(ret);
    });
});

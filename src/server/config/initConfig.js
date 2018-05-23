
const config = require('./');
const initProcess = require('./initProcess');
const initExpress = require('./initExpress');
const initNext = require('./initNext');

module.exports = options => new Promise((resolve, reject) => {
  // merge
  const mergedOptions = {
    ...config,
    ...options,
  };

  const ret = {};

  // init process
  initProcess(options);

  // init express
  ret.server = initExpress(mergedOptions);

  // init nextjs
  initNext(mergedOptions)
    .then((nextApp) => {
      ret.nextApp = nextApp;
      return resolve(ret);
    });
});

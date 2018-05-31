//
// init next
//
const d = require('debug')('app:nextjs');

const createNextApp = require('next');
const {
  isDev,
} = require('../config');
  
module.exports = ({
  nextApp, // nextjs app
  nextAppDir = './', // 
} = {}) => new Promise((resolve, reject) => {
  if (!nextApp) {
    d('creating nextjs app');
  }
  //
  // create new nextjs app if no one created
  const app = nextApp || createNextApp({
    dir: nextAppDir,
    dev: isDev
  });
  //
  // init next app
  app.prepare()
    .then(() => resolve(app));
});

//
// server main
//

//
// load .env
require('dotenv/config');
//
// debug
const d = require('debug')('app:server');

const {
  APP_PORT,
  isDev,
} = require('./config');

const initApp = require('./init');

d('Start loading...');
initApp({})
  .then(
    //  
    // App is initialized successfully
    async (appInst) => {
      const { server, nextApp } = appInst;

      server.get('/news', (req, res) => {
        const actualPage = '/';
        nextApp.render(req, res, actualPage);
      });
    
      server.get('*', (req, res) => nextApp.getRequestHandler()(req, res));

      //
      // start listening
      try {
        await server.listen(APP_PORT);
        console.log(`> App ready on port: ${APP_PORT}`);
        console.log(`> isDev: ${isDev}`);
      } catch (err) {
        console.error(err);
        process.exit(1);
      }
    },

    //  
    // Error while initApp()
    (error) => {
      console.error('!!! Error occurred: ', error);
      process.exit(1);
    })
//  
// Exception while initApp()
  .catch((exception) => {
    console.error('!!! Exception occurred: ', exception);
    process.exit(1);
  });

module.exports = {};

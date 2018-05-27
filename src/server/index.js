//
// server main
//

//
// load .env
import 'dotenv/config';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bodyParser from 'body-parser';

import {
  APP_PORT,
  APP_URI,
  GRAPHQL_URL,
  isDev,
} from './config';

import initConfig from './config/initConfig';

//
// debug
const d = require('debug')('app:server');

d('Start loading...');

initConfig({})
  .then((appConfig) => {
    const { 
      server,
      nextApp
    } = appConfig;


    /* BEGIN EXPRESS ROUTES */

    // This is how to render a masked route with NextJS
    // server.get('/p/:id', (req, res) => {
    //   const actualPage = '/post';
    //   const queryParams = { id: req.params.id };
    //   app.render(req, res, actualPage, queryParams);
    // });
    server.get('/news', (req, res) => {
      const actualPage = '/';
      nextApp.render(req, res, actualPage);
    });

    const handle = nextApp.getRequestHandler();
    server.get('*', (req, res) => handle(req, res));

    /* END EXPRESS ROUTES */

    server.listen(APP_PORT, (err) => {
      if (err) {
        console.error(err);
        throw err;
      }
      console.log(`> App ready on ${APP_URI}`);
      console.log(`> GraphQL Ready on ${GRAPHQL_URL}`);
      console.log(`> Dev: ${isDev}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

export default {};

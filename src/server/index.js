//
// server main
//

//
// load .env
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bodyParser from 'body-parser';
import {
  APP_PORT,
  APP_URI,
  GRAPHQL_URL,
  isDev,
  initConfig
} from './config';

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

    /* BEGIN PASSPORT.JS AUTHENTICATION */
    passport.use(new LocalStrategy(
      {
        usernameField: 'id',
      },
      async (username, password, done) => {
        const user = await User.getUser(username);
        // if (err) return done(err);
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!(await User.validPassword(username, password))) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      },
    ));

    /*
    In this example, only the user ID is serialized to the session,
    keeping the amount of data stored within the session small. When
    subsequent requests are received, this ID is used to find the user,
    which will be restored to req.user.
  */
    passport.serializeUser((user, cb) => {
      cb(null, user.id);
    });
    passport.deserializeUser(async (id, cb) => {
      const user = await User.getUser(id);
      cb(null, user || null);
    });
    server.use(cookieParser('mysecret'));
    server.use(session({
      secret: 'mysecret',
      resave: false,
      rolling: true,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // Requires https: secure: false
    }));
    server.use(passport.initialize());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(passport.session());

    server.post('/login', (req, res, next) => {
      req.session.returnTo = req.body.goto;
      next();
    }, passport.authenticate(
      'local',
      {
        successReturnToOrRedirect: '/',
        failureRedirect: '/login?how=unsuccessful',
      },
    ));
    server.post('/register', async (req, res, next) => {
      if (!req.user) {
        try {
          await User.registerUser({
            id: req.body.id,
            password: req.body.password,
          });
          req.session.returnTo = `/user?id=${req.body.id}`;
        } catch (err) {
          req.session.returnTo = `/login?how=${err.code}`;
        }
      } else req.session.returnTo = '/login?how=user';
      next();
    }, passport.authenticate(
      'local',
      {
        successReturnToOrRedirect: '/',
        failureRedirect: '/login?how=unsuccessful',
      },
    ));
    server.get('/logout', (req, res) => {
      req.logout();
      res.redirect('/');
    });

    /* END PASSPORT.JS AUTHENTICATION */


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

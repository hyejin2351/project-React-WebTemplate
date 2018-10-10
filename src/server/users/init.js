//
// debug
const log = require('debug')('app:auth');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
// const cors = require('cors');

const UserModel = require('./models/user');
const { 
  USERNAME_FIELD_NAME, 
  PASSWORD_FIELD_NAME,
  routePath,
  isDevUsers,
  AUTH_SESSION_SECRET,
} = require('./config');

const routeSignup = require('./signup/routesSignup');
//const routeAuthJwt = require('./authJwt/routesAuth');
const routeAuthSession = require('./session/routesAuth');

const routePassport = require('./passport/routePassport');

const passportInit = require('./passport');

module.exports = function init(server, mongooseConnection, {
  isDev,
} = {}) {
  log(`Init users with isDevUsers, ${isDevUsers} (isDevApp: ${isDev})`);
  log(`USERNAME_FIELD_NAME:${USERNAME_FIELD_NAME}, PASSWORD_FIELD_NAME:${PASSWORD_FIELD_NAME}`);
  // set env variable for SESSION
  if (!AUTH_SESSION_SECRET || AUTH_SESSION_SECRET.length < 10) {
    console.log('[app:auth] check your AUTH_SESSION_SECRET in config.js: ', AUTH_SESSION_SECRET);
  }

  server.use(bodyParser.urlencoded({ extended: false }));
  // server.use(bodyParser.json());

  server.use(cookieParser(AUTH_SESSION_SECRET));

  const sessionMaxAge = 7 * 24 * 60 * 60; // 7 days
  // See https://www.npmjs.com/package/connect-mongo for options
  const sessionStore = mongooseConnection ? new MongoStore({ 
    mongooseConnection,
    ttl: sessionMaxAge,
    autoRemove: 'native', // Default
    touchAfter: isDevUsers ? 10 : (1 * 60 * 60), // lazy update session. time period in seconds
    // collection: 'sessions', // session collection name
  }) : null;

  server.use(expressSession({
    secret: AUTH_SESSION_SECRET,
    resave: false,
    rolling: true,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * sessionMaxAge }, // Requires https: secure: false
    store: sessionStore,
  }));

  //  passport init
  passportInit(server);

  // enable cors
  // const corsOptions = {
  //   origin: '<insert uri of front-end domain>',
  //    credentials: true // <-- REQUIRED backend setting
  //  };
  //  server.use(cors(corsOptions));
 
  //
  // routers
  //

  // set routes for signup
  server.use(routePath.prefix, routeSignup({
    UserModel, 
    routePath
  }));

  // set routes for login
  server.use(routePath.prefix, routeAuthSession({
    routePath
  }));

  server.use(routePath.prefix, routePassport({
    routePath
  }));

  // TODO: routes for JWT
  // server.use(routePath.prefix, routeAuthJwt({
  //   AUTH_JWT_SECRET,
  //   routePath
  // }));
};

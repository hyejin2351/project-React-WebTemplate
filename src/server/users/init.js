//
// debug
const d = require('debug')('app:auth');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
// const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UserModel = require('./models/user');
const { 
  usernameField, 
  passwordField,
  routePath,
  isDevMode,
} = require('./config');

const routeSignup = require('./signup/routesSignup');
//const routeAuthJwt = require('./authJwt/routesAuth');
const routeAuthSession = require('./authSession/routesAuth');

module.exports = function init(server, mongooseConnection, {
  AUTH_SESSION_SECRET,
}) {
  // set env variable for SESSION
  if (process.env.AUTH_SESSION_SECRET) {
    d('use existing AUTH_SESSION_SECRET');
  } else {
    process.env.AUTH_SESSION_SECRET = AUTH_SESSION_SECRET;
  }

  // user serialization
  passport.serializeUser(UserModel.serializeUser());
  passport.deserializeUser(UserModel.deserializeUser());

  passport.use(new LocalStrategy({
    usernameField,
    passwordField,
    session: true
  }, 
  UserModel.authenticate()));

  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(cookieParser(AUTH_SESSION_SECRET));

  const sessionMaxAge = 7 * 24 * 60 * 60; // 7 days
  // See https://www.npmjs.com/package/connect-mongo for options
  const sessionStore = mongooseConnection ? new MongoStore({ 
    mongooseConnection,
    ttl: sessionMaxAge,
    autoRemove: 'native', // Default
    touchAfter: isDevMode ? 10 : (1 * 60 * 60), // lazy update session. time period in seconds
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

  // pass the passport middleware
  server.use(passport.initialize());

  server.use(passport.session());
  
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

  // // set routes for login
  // server.use(routePath.prefix, routeAuthJwt({
  //   AUTH_JWT_SECRET,
  //   routePath
  // }));

  // set routes for login
  server.use(routePath.prefix, routeAuthSession({
    routePath
  }));
};

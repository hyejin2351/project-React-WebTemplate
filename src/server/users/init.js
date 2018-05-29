//
// debug
const d = require('debug')('app:auth');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UserModel = require('./models/user');
const { 
  usernameField, 
  passwordField,
  routePath,
} = require('./config');

const routeSignup = require('./signup/routesSignup');
//const routeAuthJwt = require('./authJwt/routesAuth');
const routeAuthSession = require('./authSession/routesAuth');

module.exports = function init(server, {
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
  server.use(expressSession({
    secret: AUTH_SESSION_SECRET,
    resave: false,
    rolling: true,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // Requires https: secure: false
  }));

  // pass the passport middleware
  server.use(passport.initialize());

  server.use(passport.session());
  
 // enable cors
   var corsOptions = {
 //   origin: '<insert uri of front-end domain>',
    credentials: true // <-- REQUIRED backend setting
  };
  server.use(cors(corsOptions));
 

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

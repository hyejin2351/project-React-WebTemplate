//
// debug
const d = require('debug')('app:auth');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UserModel = require('./models/user');
const { usernameField, 
  passwordField,
  routePath,
} = require('./config');

const routeSignup = require('./signup/routesSignup');
const routeAuthJwt = require('./authJwt/routesAuth');

module.exports = function init(server, {
  AUTH_JWT_SECRET,
  // TODO
  // AUTH_SESSION_SECRET,
}) {
  // set env variable for JWT
  if (process.env.AUTH_JWT_SECRET) {
    d('use existing AUTH_JWT_SECRET');
  } else {
    process.env.AUTH_JWT_SECRET = AUTH_JWT_SECRET;
  }

  // 
  // pass the passport middleware
  server.use(passport.initialize());

  // app.use(passport.session({secret: "cats"}));
  passport.serializeUser(UserModel.serializeUser());
  passport.deserializeUser(UserModel.deserializeUser());

  passport.use(new LocalStrategy({
    usernameField,
    passwordField,
    session: false
  }, 
  UserModel.authenticate())
  );

  // set routes for signup
  server.use('/auth', routeSignup({
    UserModel, 
    routePath
  }));
  // set routes for login
  server.use('/auth', routeAuthJwt({
    AUTH_JWT_SECRET,
    routePath
  }));
};

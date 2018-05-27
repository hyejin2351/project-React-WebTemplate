//
// debug
const d = require('debug')('app:auth');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');

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

  // tell the app to parse HTTP body messages
  server.use(bodyParser.urlencoded({ extended: false }));

  // parse JSON
  server.use(bodyParser.json());

  // pass the passport middleware
  server.use(passport.initialize());

  // user serialization
  passport.serializeUser(UserModel.serializeUser());
  passport.deserializeUser(UserModel.deserializeUser());

  passport.use(new LocalStrategy({
    usernameField,
    passwordField,
    session: false
  }, 
  UserModel.authenticate()
  /* or use the below
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
  */
  ));

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

//
// debug
const d = require('debug')('app:auth');

const passport = require('passport');
const {
  dev
} = require('../../config');

/* module.exports = (options = {}) => (!dev ? passport.authenticate('local', options) :
  (req, res, next) => {
    d('Login middleware...', req.body);
    passport.authenticate('local', options)(req, res, next);
  });
 */
module.exports = (options = {}) => passport.authenticate('local', options);

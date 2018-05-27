//
// debug
const d = require('debug')('app:auth');

const passport = require('passport');
const {
  dev
} = require('../../config');

module.exports = !dev ? passport.authenticate('local') :
  (req, res, next) => {
    d('++++++++++ login middleware...', req.body);
    passport.authenticate('local')(req, res, next);
  };

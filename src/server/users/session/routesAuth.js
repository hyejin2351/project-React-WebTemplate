//
// debug
const d = require('debug')('app:auth');
const express = require('express');
const passport = require('passport');

function validateLoginData(data) {
  let error;
  let { email, password } = data;

  if (!email || !password) {
    error = 'Invalid request';
  } else {
    email = email.trim();
    password = password.trim();
    if (email.length < 1 || password.length < 1) {
      error = 'Invalid request';
    }
  }
  return {
    success: !error, 
    message: error,
    email,
    password
  };
}

module.exports = ({
  routePath,
}) => {
  const router = new express.Router();

  router.post(routePath.login,
    (req, res, next) => {
      d('auth request: ', req.body);
      // data validation
      const ret = validateLoginData(req.body);
      if (!ret.success) {
        d('validation failure: ', ret.message);
        return res.status(400).json(ret);
      }
      // do authentication
      req.body = ret;
      passport.authenticate('local', (err, user, info) => {
        if (err || !user) {
          d('auth failure: ', err || '');
          return res.status(400).json({
            success: false,
            message: 'Invalid request'
          });
        }
        req.login(user, (loginErr) => {
          if (loginErr) { 
            d('logIn failure: ', loginErr || '');
            return res.status(400).json({
              success: false,
              message: 'Invalid request'
            });
          }
          // Inside serializeUser callback. 
          // User id is saved to the session store here
          d('authorized...');
          d(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
          d(`req.user: ${JSON.stringify(req.user)}`);
          const data = {
            userId: req.user.id
          };
          return res.json({
            success: true,
            message: 'login success',
            data
          });
        });
      })(req, res, next);
    },
  );

  router.get(routePath.logout, (req, res) => {
    if (req.user) {
      req.logout();
    } else {
      d('invalid logout request');
    }
    return res.json({
      success: true,
      message: 'logged out',
    });
  });

  return router;
};

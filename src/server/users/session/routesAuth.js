//
// debug
const log = require('debug')('app:auth');
const express = require('express');
const passport = require('passport');

const JSONResponse = require('../../../lib/JSONResponse');

function validateLoginData(data) {
  // TODO more strict validation
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

  //
  // handle login request
  router.post(routePath.login,
    (req, res, next) => {
      log('auth request: ', req.body);

      // check session
      if (req.user) {
        log('already logged in user: ', req.user);
        return JSONResponse.send(200, {
          success: true,
          message: 'already logged in'
        })(req, res);
      }

      // data validation
      const ret = validateLoginData(req.body);
      if (!ret.success) {
        log('validation failure: ', ret.message);
        return res.status(400).json(ret);
      }

      // do authentication
      const { goto = '/' } = req.body;
      req.body = ret;
      passport.authenticate('local', (err, user, info) => {
        if (err || !user) {
          log('auth failure: ', err || 'no user');
          return res.status(400).json({
            success: false,
            message: 'Invalid request'
          });
        }
        req.login(user, (loginErr) => {
          if (loginErr) { 
            log('logIn failure: ', loginErr || '');
            return res.status(400).json({
              success: false,
              message: 'Invalid request'
            });
          }
          // Inside serializeUser callback. 
          // User id is saved to the session store here
          log('authorized...');
          log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
          log(`req.user: ${JSON.stringify(req.user)}`);
          //
          // send response
          if (req.accepts('application/json')) {
            const data = {
              userId: req.user.id
            };
            log('sending JSON response: data: ', data);
            return res.json({
              success: true,
              message: 'login success',
              data
            });
          }
          log('redirecting to ', goto);
          return res.redirect(goto);
        });
      })(req, res, next);
    },
  );

  router.get(routePath.logout, (req, res) => {
    log('logout request...');
    if (req.user) {
      log('logged out user:', req.user.id);
      // Invoking logout() will remove the req.user property and 
      // clear the login session (if any).
      req.logout();
    } else {
      log('invalid logout request');
    }
    //
    // send response
    if (req.accepts('application/json')) {
      log('sending JSON response');
      return res.json({
        success: true,
        message: 'logged out',
      });
    }
    const { goto = '/' } = req.query;
    log('redirecting to ', goto);
    return res.redirect(goto);
  });

  return router;
};

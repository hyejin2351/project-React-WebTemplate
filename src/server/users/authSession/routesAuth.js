//
// debug
const d = require('debug')('app:auth');
const express = require('express');

const login = require('./middleware/login');

module.exports = ({
  routePath,
}) => {
  const router = new express.Router();

  router.post(routePath.login,
    (req, res, next) => {
      // if (!req.accepts('application/json')) {  }
      d('req body', req.body);
      req.session.returnTo = req.body.goto || '/';
      next();
    },
    login({
      successReturnToOrRedirect: '/',
      failureRedirect: '/users/login?how=unsuccessful',
    })
  );

  router.get(routePath.logout, (req, res) => {
    req.logout();
    res.redirect('/');
  });

  return router;
};

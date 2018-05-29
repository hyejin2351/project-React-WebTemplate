//
// debug
const d = require('debug')('app:auth');
const express = require('express');

const register = require('./middleware/register');
const unregister = require('./middleware/unregister');

module.exports = ({
  UserModel,
  routePath,
}) => {
  const router = new express.Router();

  router.post(routePath.register, 
    register(UserModel), 
    (req, res) => {
      d('Register is successful... Redirecting to /(router root)');
      res.redirect('/users/login');
    });

  router.post(routePath.unregister, 
    unregister(UserModel), 
    (req, res) => {
      d('Unregister is successful... Redirecting to /(router root)');
      res.redirect('/users/login');
    });

  return router;
};

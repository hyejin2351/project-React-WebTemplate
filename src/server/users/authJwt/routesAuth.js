//
// debug
const d = require('debug')('app:auth');

const express = require('express');
const jwt = require('jsonwebtoken');

const login = require('./middleware/login');

module.exports = ({
  AUTH_JWT_SECRET,
  routePath,
}) => {
  const router = new express.Router();

  router.post(routePath.login, login, (req, res) => {
    const { user } = req;
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'login failure'
      });
    }
    d('Loggined user: ', user.id);

    // create payload
    const payload = {
      sub: user.id
    };

    // create a token string with payload
    const token = jwt.sign(payload, AUTH_JWT_SECRET);
        
    const data = {
      userId: user.id
    };

    return res.json({
      success: true,
      message: 'login success',
      token,
      user: data
    });
  });

  return router;
};
